import PubgModel from "../models/pubgModel.js";

const pubgPost = async (req, res) => {
  const { title, description, thumbnail, price, distance, catagory } = req.body;
  let photo = '';

  // Eğer bir fotoğraf dosyası mevcutsa base64 olarak dönüştür
  if (req.file) {
    photo = req.file.buffer.toString('base64');
  }

  try {
    // Yeni pubg postu oluştur ve fotoğrafı ekle
    const pubg = await PubgModel.create({
      title,
      description,
      thumbnail,
      price,
      distance,
      catagory,
      photo
    });

    res.status(201).json({ pubg });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const getPubg = async (req, res) => {
  try {
    const allPubges = await PubgModel.find();
    res.json({ allPubges });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getByIdPubg = async (req, res) => {
  const { id } = req.params;
  try {
    const getById = await PubgModel.findById(id);
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
    const deletedData = await PubgModel.findOneAndDelete({ _id: id });
    if (!deletedData) {
      return res.status(404).json({ error: "Note not found" });
    }
    res.json({ deletedData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { pubgPost, getPubg, getByIdPubg, deleteById };
