import TiktokModel from "../models/tiktokModel.js";

const tiktokPost = async (req, res) => {
  const { title, description, thumbnail, price, distance, catagory } = req.body;
  let photo = '';

  // Eğer bir fotoğraf dosyası mevcutsa base64 olarak dönüştür
  if (req.file) {
    photo = req.file.buffer.toString('base64');
  }

  try {
    // Yeni TikTok postu oluştur ve fotoğrafı ekle
    const tiktok = await TiktokModel.create({
      title,
      description,
      thumbnail,
      price,
      distance,
      catagory,
      photo
    });

    res.status(201).json({ tiktok });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};




const getTiktok = async (req, res) => {
  try {
    const allTiktokes = await TiktokModel.find();
    res.json({ allTiktokes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getByIdTiktok = async (req, res) => {
  const { id } = req.params;
  try {
    const getById = await TiktokModel.findById(id);
    if (!getById) {
      return res.status(404).json({ error: "Note not found" });
    }
    res.json({ getById });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedData = await TiktokModel.findOneAndDelete({ _id: id });
    if (!deletedData) {
      return res.status(404).json({ error: "Note not found" });
    }
    res.json({ deletedData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { tiktokPost, getTiktok, getByIdTiktok, deleteById };
