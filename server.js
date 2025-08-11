import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
fs.mkdir(uploadsDir, { recursive: true }).catch(console.error);

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// Data file path
const dataFilePath = path.join(__dirname, 'data.json');

// Initialize data.json if it doesn't exist
async function initializeData() {
  try {
    await fs.access(dataFilePath);
  } catch {
    const initialData = {
      events: [
        {
          id: 1,
          title: 'Herastrau Park Morning Run',
          date: '2024-12-15',
          time: '09:00',
          location: 'Herastrau Park',
          distance: '5K - 8K',
          difficulty: 'All Levels',
          coffeeStop: 'Origo Coffee Shop',
          description: 'Beautiful lakeside run through Bucharest\'s largest park',
          image: 'https://images.pexels.com/photos/2526878/pexels-photo-2526878.jpeg?auto=compress&cs=tinysrgb&w=800',
          runnerCount: 15
        },
        {
          id: 2,
          title: 'Old Town Historic Circuit',
          date: '2024-12-22',
          time: '09:00',
          location: 'Old Town Circuit',
          distance: '4K - 6K',
          difficulty: 'Beginner Friendly',
          coffeeStop: 'Cafea Specialty',
          description: 'Historic route through cobblestone streets and landmarks',
          image: 'https://images.pexels.com/photos/1556691/pexels-photo-1556691.jpeg?auto=compress&cs=tinysrgb&w=800',
          runnerCount: 10
        },
        {
          id: 3,
          title: 'New Year Preparation Run',
          date: '2024-12-29',
          time: '09:00',
          location: 'Cismigiu Gardens',
          distance: '3K - 7K',
          difficulty: 'All Levels',
          coffeeStop: 'The Ark Coffee',
          description: 'New Year preparation run in the heart of the city',
          image: 'https://images.pexels.com/photos/2402846/pexels-photo-2402846.jpeg?auto=compress&cs=tinysrgb&w=800',
          runnerCount: 20
        }
      ],
      articles: [
        {
          id: 1,
          title: 'The Perfect Pre-Run Breakfast',
          titleRo: 'Micul dejun perfect înainte de alergare',
          excerpt: 'Discover what to eat before your morning run to maximize performance and avoid digestive issues.',
          excerptRo: 'Descoperă ce să mănânci înainte de alergarea de dimineață pentru a maximiza performanța și a evita problemele digestive.',
          author: 'Maria Popescu',
          date: '2024-12-10',
          image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
          category: 'Nutrition',
          categoryRo: 'Nutriție'
        },
        {
          id: 2,
          title: 'Running in Winter: Essential Tips',
          titleRo: 'Alergarea iarna: Sfaturi esențiale',
          excerpt: 'Stay motivated and safe during cold weather runs with our comprehensive winter running guide.',
          excerptRo: 'Rămâi motivat și în siguranță în timpul alergărilor pe vreme rece cu ghidul nostru complet pentru alergarea de iarnă.',
          author: 'Alexandru Ionescu',
          date: '2024-12-08',
          image: 'https://images.pexels.com/photos/2402846/pexels-photo-2402846.jpeg?auto=compress&cs=tinysrgb&w=400',
          category: 'Training',
          categoryRo: 'Antrenament'
        },
        {
          id: 3,
          title: 'Best Coffee Spots After Your Run',
          titleRo: 'Cele mai bune cafenele după alergare',
          excerpt: 'Our curated list of the best coffee shops in Bucharest perfect for post-run recovery.',
          excerptRo: 'Lista noastră selectată cu cele mai bune cafenele din București perfecte pentru recuperarea după alergare.',
          author: 'Ioana Marinescu',
          date: '2024-12-05',
          image: 'https://images.pexels.com/photos/1571939/pexels-photo-1571939.jpeg?auto=compress&cs=tinysrgb&w=400',
          category: 'Coffee',
          categoryRo: 'Cafea'
        }
      ],
      photos: [
        {
          id: 1,
          url: 'https://images.pexels.com/photos/2526878/pexels-photo-2526878.jpeg?auto=compress&cs=tinysrgb&w=400',
          caption: 'Sunday morning run through Herastrau Park'
        },
        {
          id: 2,
          url: 'https://images.pexels.com/photos/1571939/pexels-photo-1571939.jpeg?auto=compress&cs=tinysrgb&w=400',
          caption: 'Post-run coffee celebration'
        },
        {
          id: 3,
          url: 'https://images.pexels.com/photos/1671327/pexels-photo-1671327.jpeg?auto=compress&cs=tinysrgb&w=400',
          caption: 'Our amazing running community'
        },
        {
          id: 4,
          url: 'https://images.pexels.com/photos/1556691/pexels-photo-1556691.jpeg?auto=compress&cs=tinysrgb&w=400',
          caption: 'Exploring Old Town Bucharest'
        },
        {
          id: 5,
          url: 'https://images.pexels.com/photos/2402846/pexels-photo-2402846.jpeg?auto=compress&cs=tinysrgb&w=400',
          caption: 'Coffee time after a great run'
        },
        {
          id: 6,
          url: 'https://images.pexels.com/photos/1571940/pexels-photo-1571940.jpeg?auto=compress&cs=tinysrgb&w=400',
          caption: 'Team spirit and friendship'
        }
      ],
      crewMembers: [
        {
          id: 1,
          name: 'Alexandra',
          role: 'Founder',
          roleRo: 'Fondator',
          description: 'The visionary behind Run To Sip, passionate about building community through running.',
          descriptionRo: 'Vizionara din spatele Run To Sip, pasionată de construirea comunității prin alergare.',
          image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
          instagram: '@alexandra_runtosip'
        },
        {
          id: 2,
          name: 'Nemir',
          role: 'Co-Founder',
          roleRo: 'Co-Fondator',
          description: 'Bringing energy and enthusiasm to every run, ensuring everyone feels welcome.',
          descriptionRo: 'Aducând energie și entuziasm la fiecare alergare, asigurându-se că toată lumea se simte binevenită.',
          image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400',
          instagram: '@nemir_runs'
        },
        {
          id: 3,
          name: 'Tudor',
          role: 'Photographer',
          roleRo: 'Fotograf',
          description: 'Capturing the beautiful moments and memories from our running adventures.',
          descriptionRo: 'Surprinzând momentele frumoase și amintirile din aventurile noastre de alergare.',
          image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
          instagram: '@tudor_photos'
        },
        {
          id: 4,
          name: 'Ionut',
          role: 'Pacer',
          roleRo: 'Pacer',
          description: 'Keeping the group together and ensuring everyone maintains their perfect pace.',
          descriptionRo: 'Menținând grupul unit și asigurându-se că toată lumea își păstrează ritmul perfect.',
          image: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400',
          instagram: '@ionut_pacer'
        }
      ]
    };
    await fs.writeFile(dataFilePath, JSON.stringify(initialData, null, 2));
  }
}

// Helper function to read data
async function readData() {
  const data = await fs.readFile(dataFilePath, 'utf8');
  return JSON.parse(data);
}

// Helper function to write data
async function writeData(data) {
  await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2));
}

// Initialize data on server start
initializeData();

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend server is working!', timestamp: new Date().toISOString() });
});

// Get all data
app.get('/api/data', async (req, res) => {
  try {
    const data = await readData();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read data' });
  }
});

// EVENTS API
app.get('/api/events', async (req, res) => {
  try {
    const data = await readData();
    res.json(data.events);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

app.post('/api/events', async (req, res) => {
  try {
    const data = await readData();
    const newEvent = { ...req.body, id: Date.now() };
    data.events.push(newEvent);
    await writeData(data);
    res.json(newEvent);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create event' });
  }
});

app.put('/api/events/:id', async (req, res) => {
  try {
    const data = await readData();
    const eventId = parseInt(req.params.id);
    const eventIndex = data.events.findIndex(e => e.id === eventId);
    
    if (eventIndex === -1) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    data.events[eventIndex] = { ...data.events[eventIndex], ...req.body };
    await writeData(data);
    res.json(data.events[eventIndex]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update event' });
  }
});

app.delete('/api/events/:id', async (req, res) => {
  try {
    const data = await readData();
    const eventId = parseInt(req.params.id);
    data.events = data.events.filter(e => e.id !== eventId);
    await writeData(data);
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete event' });
  }
});

// Join event endpoint
app.post('/api/events/:id/join', async (req, res) => {
  try {
    const data = await readData();
    const eventId = parseInt(req.params.id);
    const eventIndex = data.events.findIndex(e => e.id === eventId);
    
    if (eventIndex === -1) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }
    
    data.events[eventIndex].runnerCount += 1;
    await writeData(data);
    res.json({ success: true, message: 'You have successfully joined the event!' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to join event' });
  }
});

// ARTICLES API
app.get('/api/articles', async (req, res) => {
  try {
    const data = await readData();
    res.json(data.articles);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
});

app.post('/api/articles', async (req, res) => {
  try {
    const data = await readData();
    const newArticle = { ...req.body, id: Date.now() };
    data.articles.push(newArticle);
    await writeData(data);
    res.json(newArticle);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create article' });
  }
});

app.put('/api/articles/:id', async (req, res) => {
  try {
    const data = await readData();
    const articleId = parseInt(req.params.id);
    const articleIndex = data.articles.findIndex(a => a.id === articleId);
    
    if (articleIndex === -1) {
      return res.status(404).json({ error: 'Article not found' });
    }
    
    data.articles[articleIndex] = { ...data.articles[articleIndex], ...req.body };
    await writeData(data);
    res.json(data.articles[articleIndex]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update article' });
  }
});

app.delete('/api/articles/:id', async (req, res) => {
  try {
    const data = await readData();
    const articleId = parseInt(req.params.id);
    data.articles = data.articles.filter(a => a.id !== articleId);
    await writeData(data);
    res.json({ message: 'Article deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete article' });
  }
});

// PHOTOS API
app.get('/api/photos', async (req, res) => {
  try {
    const data = await readData();
    res.json(data.photos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch photos' });
  }
});

app.post('/api/photos', async (req, res) => {
  try {
    const data = await readData();
    const newPhoto = { ...req.body, id: Date.now() };
    data.photos.push(newPhoto);
    await writeData(data);
    res.json(newPhoto);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create photo' });
  }
});

app.put('/api/photos/:id', async (req, res) => {
  try {
    const data = await readData();
    const photoId = parseInt(req.params.id);
    const photoIndex = data.photos.findIndex(p => p.id === photoId);
    
    if (photoIndex === -1) {
      return res.status(404).json({ error: 'Photo not found' });
    }
    
    data.photos[photoIndex] = { ...data.photos[photoIndex], ...req.body };
    await writeData(data);
    res.json(data.photos[photoIndex]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update photo' });
  }
});

app.delete('/api/photos/:id', async (req, res) => {
  try {
    const data = await readData();
    const photoId = parseInt(req.params.id);
    data.photos = data.photos.filter(p => p.id !== photoId);
    await writeData(data);
    res.json({ message: 'Photo deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete photo' });
  }
});

// CREW API
app.get('/api/crew', async (req, res) => {
  try {
    const data = await readData();
    res.json(data.crewMembers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch crew members' });
  }
});

app.post('/api/crew', async (req, res) => {
  try {
    const data = await readData();
    const newCrewMember = { ...req.body, id: Date.now() };
    data.crewMembers.push(newCrewMember);
    await writeData(data);
    res.json(newCrewMember);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create crew member' });
  }
});

app.put('/api/crew/:id', async (req, res) => {
  try {
    const data = await readData();
    const crewId = parseInt(req.params.id);
    const crewIndex = data.crewMembers.findIndex(c => c.id === crewId);
    
    if (crewIndex === -1) {
      return res.status(404).json({ error: 'Crew member not found' });
    }
    
    data.crewMembers[crewIndex] = { ...data.crewMembers[crewIndex], ...req.body };
    await writeData(data);
    res.json(data.crewMembers[crewIndex]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update crew member' });
  }
});

app.delete('/api/crew/:id', async (req, res) => {
  try {
    const data = await readData();
    const crewId = parseInt(req.params.id);
    data.crewMembers = data.crewMembers.filter(c => c.id !== crewId);
    await writeData(data);
    res.json({ message: 'Crew member deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete crew member' });
  }
});

// FILE UPLOAD API
app.post('/api/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    const fileUrl = `/uploads/${req.file.filename}`;
    res.json({ url: fileUrl });
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload file' });
  }
});

// Serve uploaded files
app.use('/uploads', express.static(uploadsDir));

// Serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api`);
  console.log(`Test endpoint: http://localhost:${PORT}/api/test`);
}); 