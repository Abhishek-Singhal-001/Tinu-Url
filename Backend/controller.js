const {pool}= require('./db.js');
 const postController=async (req, res) => {
  try {
    const { targetUrl, customCode } = req.body;

    // Validate target URL
    if (!targetUrl) {
      return res.status(400).json({ error: 'Target URL is required' });
    }

    if (!validateUrl(targetUrl)) {
      return res.status(400).json({ error: 'Invalid URL format' });
    }

    // Determine code (custom or generated)
    let code = customCode;
    
    if (customCode) {
      if (!validateCode(customCode)) {
        return res.status(400).json({ 
          error: 'Custom code must be 6-8 alphanumeric characters' 
        });
      }
    } else {
      // Generate unique code
      let attempts = 0;
      do {
        code = generateCode();
        const existing = await pool.query(
          'SELECT code FROM links WHERE code = $1',
          [code]
        );
        if (existing.rows.length === 0) break;
        attempts++;
      } while (attempts < 10);
      
      if (attempts === 10) {
        return res.status(500).json({ error: 'Failed to generate unique code' });
      }
    }

    // Check if code already exists
    const existingLink = await pool.query(
      'SELECT code FROM links WHERE code = $1',
      [code]
    );

    if (existingLink.rows.length > 0) {
      return res.status(409).json({ 
        error: 'Code already exists',
        code: code 
      });
    }

    // Insert new link
    const result = await pool.query(
      `INSERT INTO links (code, target_url, clicks, last_clicked, created_at)
       VALUES ($1, $2, 0, NULL, NOW())
       RETURNING *`,
      [code, targetUrl]
    );

    const newLink = result.rows[0];
    
    res.status(201).json({
      code: newLink.code,
      targetUrl: newLink.target_url,
      clicks: newLink.clicks,
      lastClicked: newLink.last_clicked,
      createdAt: newLink.created_at,
      shortUrl: `${req.protocol}://${req.get('host')}/${newLink.code}`
    });

  } catch (err) {
    console.error('Error creating link:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}


 const getStats= async (req, res) => {
  try {
    const { code } = req.params;

    const result = await pool.query(
      'SELECT * FROM links WHERE code = $1',
      [code]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Link not found' });
    }

    const link = result.rows[0];
    
    res.json({
      code: link.code,
      targetUrl: link.target_url,
      clicks: link.clicks,
      lastClicked: link.last_clicked,
      createdAt: link.created_at
    });
  } catch (err) {
    console.error('Error fetching link:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

 const deleteLinksCodeController=async (req, res) => {
  try {
    const { code } = req.params;

    const result = await pool.query(
      'DELETE FROM links WHERE code = $1 RETURNING *',
      [code]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Link not found' });
    }

    res.json({ 
      message: 'Link deleted successfully',
      code: code 
    });
  } catch (err) {
    console.error('Error deleting link:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

 const getRedirect=async (req, res) => {
  try {
    const { code } = req.params;

    // Validate code format
    if (!validateCode(code)) {
      return res.status(404).send('Link not found');
    }

    // Get link and increment click count
    const result = await pool.query(
      `UPDATE links 
       SET clicks = clicks + 1, last_clicked = NOW()
       WHERE code = $1
       RETURNING target_url`,
      [code]
    );

    if (result.rows.length === 0) {
      return res.status(404).send('Link not found');
    }

    const targetUrl = result.rows[0].target_url;
    
    // Perform 302 redirect
    res.redirect(302, targetUrl);
  } catch (err) {
    console.error('Error redirecting:', err);
    res.status(500).send('Internal server error');
  }
}


 const getAllLinkController=async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM links ORDER BY created_at DESC'
    );

    const links = result.rows.map(row => ({
      code: row.code,
      targetUrl: row.target_url,
      clicks: row.clicks,
      lastClicked: row.last_clicked,
      createdAt: row.created_at
    }));

    res.json(links);
  } catch (err) {
    console.error('Error fetching links:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

 const getHealth=(req, res) => {
  res.status(200).json({
    ok: true,
    version: '1.0',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
}


// Validation functions
const validateUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const validateCode = (code) => {
  return /^[A-Za-z0-9]{6,8}$/.test(code);
};

const generateCode = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

module.exports={
  postController,
  getAllLinkController,
  deleteLinksCodeController,
  getStats,
  getRedirect,
  getHealth
}