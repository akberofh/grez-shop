import FannModel from "../models/fannModel.js";

const fannPost = async (req, res) => {
  const { title, description, thumbnail, price, distance, catagory } = req.body;
  let photo = '';

  // Eğer bir fotoğraf dosyası mevcutsa base64 olarak dönüştür
  if (req.file) {
    photo = req.file.buffer.toString('base64');
  }

  try {
    // Yeni fann postu oluştur ve fotoğrafı ekle
    const fann = await FannModel.create({
      title,
      description,
      thumbnail,
      price,
      distance,
      catagory,
      photo
    });

    res.status(201).json({ fann });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getFann = async (req, res) => {
  try {
    const allFanns = await FannModel.find();
    res.json({ allFanns });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getByIdFann = async (req, res) => {
  const { id } = req.params;
  try {
    const getById = await FannModel.findById(id);
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
    const deletedData = await FannModel.findOneAndDelete({ _id: id });
    if (!deletedData) {
      return res.status(404).json({ error: "Note not found" });
    }
    res.json({ deletedData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { fannPost, getFann, getByIdFann, deleteById };
