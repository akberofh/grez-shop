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

const fannUpdateProfil = async (req, res) => {
  const { id } = req.params; // Parametrelerden ID'yi al
  try {
    // Belirtilen ID ile bir fann kaydı bul
    const fann = await FannModel.findById(id);

    if (!fann) {
      return res.status(404).json({ message: 'Fann post not found' });
    }

    // Güncelleme işleminden önce mevcut veriyi kontrol et
    console.log("Önceki Veri: ", fann);

    // Gelen verileri güncelle
    fann.title = req.body.title !== undefined ? req.body.title : fann.title;
    fann.price = req.body.price !== undefined ? req.body.price : fann.price;
    fann.description = req.body.description !== undefined ? req.body.description : fann.description;

    // Eğer bir fotoğraf dosyası mevcutsa, base64 formatında güncelle
    if (req.file) {
      fann.photo = req.file.buffer.toString('base64');
    }

    // Güncellenmiş fann kaydını kaydet
    const updatedFann = await fann.save();

    // Güncellenmeden sonraki veriyi kontrol et
    console.log("Güncellenmiş Veri: ", updatedFann);

    // Güncellenmiş veriyi döndür
    res.json({
      _id: updatedFann._id,
      title: updatedFann.title,
      description: updatedFann.description,
      photo: updatedFann.photo,
      price: updatedFann.price, // Fiyatı da yanıt olarak ekleyin
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
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

export { fannPost, getFann, getByIdFann, deleteById , fannUpdateProfil};
