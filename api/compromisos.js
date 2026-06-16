// Vercel Serverless Function to handle commitments (compromisos)
// Using native fetch to communicate with Vercel KV REST API (no npm packages needed)

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

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,DELETE,POST,OPTIONS');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const hasKv = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

    try {
        if (req.method === 'GET') {
            if (!hasKv) {
                // Return empty array if KV is not configured, frontend will know it's in fallback mode
                return res.status(200).json({ status: 'fallback', data: [] });
            }
            const rawData = await kvCommand(['GET', 'school_compromisos']);
            const list = rawData ? JSON.parse(rawData) : [];
            return res.status(200).json({ status: 'online', data: list });
        }

        if (req.method === 'POST') {
            const { nombre, compromiso, fecha } = req.body;
            if (!nombre || !compromiso) {
                return res.status(400).json({ error: 'Nombre y compromiso son requeridos.' });
            }

            if (!hasKv) {
                return res.status(503).json({ error: 'Vercel KV is not configured.' });
            }

            const rawData = await kvCommand(['GET', 'school_compromisos']);
            const list = rawData ? JSON.parse(rawData) : [];
            
            // Add to the beginning of the list
            list.unshift({ nombre, compromiso, fecha });
            
            await kvCommand(['SET', 'school_compromisos', JSON.stringify(list)]);
            
            return res.status(201).json({ success: true, item: { nombre, compromiso, fecha } });
        }

        if (req.method === 'DELETE') {
            const { index } = req.query;
            if (index === undefined) {
                return res.status(400).json({ error: 'El parámetro index es requerido.' });
            }

            if (!hasKv) {
                return res.status(503).json({ error: 'Vercel KV is not configured.' });
            }

            const rawData = await kvCommand(['GET', 'school_compromisos']);
            const list = rawData ? JSON.parse(rawData) : [];
            
            const idx = parseInt(index);
            if (isNaN(idx) || idx < 0 || idx >= list.length) {
                return res.status(400).json({ error: 'Índice fuera de rango.' });
            }

            list.splice(idx, 1);
            await kvCommand(['SET', 'school_compromisos', JSON.stringify(list)]);
            
            return res.status(200).json({ success: true });
        }

        return res.status(405).json({ error: 'Método no permitido.' });
    } catch (err) {
        console.error('Serverless function error:', err);
        return res.status(500).json({ error: err.message });
    }
}
