module.exports = async function handler(request, response) {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET');
    return response.status(405).json({ error: 'Method not allowed' });
  }

  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;
  const counterKey = process.env.VIEW_COUNTER_KEY || 'fc-jiskra-modra:website-views';

  response.setHeader('Cache-Control', 'no-store, max-age=0');

  if (!redisUrl || !redisToken) {
    return response.status(503).json({
      count: null,
      configured: false,
      message: 'View counter storage is not configured.'
    });
  }

  const increment = request.query.increment !== '0';
  const command = increment ? 'incr' : 'get';
  const endpoint = `${redisUrl.replace(/\/$/, '')}/${command}/${encodeURIComponent(counterKey)}`;

  try {
    const redisResponse = await fetch(endpoint, {
      headers: { Authorization: `Bearer ${redisToken}` }
    });
    if (!redisResponse.ok) throw new Error(`Redis returned ${redisResponse.status}`);
    const payload = await redisResponse.json();
    const count = Number(payload.result || 0);
    return response.status(200).json({ count, configured: true });
  } catch (error) {
    console.error('View counter error:', error.message);
    return response.status(502).json({ count: null, configured: true, error: 'Counter unavailable' });
  }
};
