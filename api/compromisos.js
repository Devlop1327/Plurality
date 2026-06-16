// Vercel Serverless Function to handle commitments (compromisos)
// Supports both Vercel KV (REST) and Redis Cloud / standard Redis (TCP via redis npm package)

import { createClient } from 'redis';

// Helper for HTTP-based Vercel KV REST API
async function kvCommand(command) {
    if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
        throw new Error('Vercel KV environment variables are not set.');
    }
    const res = await fetch(process.env.KV_REST_API_URL, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(command)
    });
    
    if (!res.ok) {
        const errText = await res.text();
        throw new Error(`KV API Error: ${res.status} - ${errText}`);
    }
    
    const data = await res.json();
    if (data.error) {
        throw new Error(`KV command error: ${data.error}`);
    }
    return data.result;
}

// Redis TCP Client management
let redisClient = null;
async function getRedisClient() {
    const url = process.env.REDIS_URL || process.env.KV_URL;
    if (!url) return null;
    
    if (!redisClient) {
        redisClient = createClient({ url });
        redisClient.on('error', (err) => console.error('Redis Client Error', err));
        await redisClient.connect();
    }
    return redisClient;
}

export default async function handler(req, res) {
    // Enable CORS & Disable Caching
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,DELETE,POST,OPTIONS');
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const hasRest = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
    let redisTcpClient = null;
    let hasRedis = false;

    try {
        redisTcpClient = await getRedisClient();
        hasRedis = !!redisTcpClient || hasRest;
    } catch (e) {
        console.error('Failed to initialize Redis TCP client:', e);
        hasRedis = hasRest;
    }

    // Helper functions to get and set
    async function getData() {
        if (redisTcpClient) {
            const val = await redisTcpClient.get('school_compromisos');
            return val ? JSON.parse(val) : [];
        } else if (hasRest) {
            const rawData = await kvCommand(['GET', 'school_compromisos']);
            return rawData ? JSON.parse(rawData) : [];
        }
        return [];
    }

    async function setData(list) {
        if (redisTcpClient) {
            await redisTcpClient.set('school_compromisos', JSON.stringify(list));
        } else if (hasRest) {
            await kvCommand(['SET', 'school_compromisos', JSON.stringify(list)]);
        }
    }

    try {
        if (req.method === 'GET') {
            if (!hasRedis) {
                return res.status(200).json({ status: 'fallback', data: [] });
            }
            const list = await getData();
            return res.status(200).json({ status: 'online', data: list });
        }

        if (req.method === 'POST') {
            const { nombre, compromiso, fecha } = req.body;
            if (!nombre || !compromiso) {
                return res.status(400).json({ error: 'Nombre y compromiso son requeridos.' });
            }

            if (!hasRedis) {
                return res.status(503).json({ error: 'No Redis or Vercel KV store is configured.' });
            }

            const list = await getData();
            list.unshift({ nombre, compromiso, fecha });
            await setData(list);
            
            return res.status(201).json({ success: true, item: { nombre, compromiso, fecha } });
        }

        if (req.method === 'DELETE') {
            const { index } = req.query;
            if (index === undefined) {
                return res.status(400).json({ error: 'El parámetro index es requerido.' });
            }

            if (!hasRedis) {
                return res.status(503).json({ error: 'No Redis or Vercel KV store is configured.' });
            }

            const list = await getData();
            const idx = parseInt(index);
            if (isNaN(idx) || idx < 0 || idx >= list.length) {
                return res.status(400).json({ error: 'Índice fuera de rango.' });
            }

            list.splice(idx, 1);
            await setData(list);
            
            return res.status(200).json({ success: true });
        }

        return res.status(405).json({ error: 'Método no permitido.' });
    } catch (err) {
        console.error('Serverless function error:', err);
        return res.status(500).json({ error: err.message });
    }
}
