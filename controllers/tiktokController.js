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


const tiktokUpdateProfil = async (req, res) => {
  const { id } = req.params; // Parametrelerden ID'yi al
  try {
    // Belirtilen ID ile bir TikTok kaydı bul
    const tiktok = await TiktokModel.findById(id);

    if (!tiktok) {
      return res.status(404).json({ message: 'TikTok post not found' });
    }

    // Güncelleme işleminden önce mevcut veriyi kontrol et
    console.log("Önceki Veri: ", tiktok);

    // Gelen verileri güncelle
    tiktok.title = req.body.title !== undefined ? req.body.title : tiktok.title;
    tiktok.price = req.body.price !== undefined ? req.body.price : tiktok.price;
    tiktok.description = req.body.description !== undefined ? req.body.description : tiktok.description;

    // Eğer bir fotoğraf dosyası mevcutsa, base64 formatında güncelle
    if (req.file) {
      tiktok.photo = req.file.buffer.toString('base64');
    }

    // Güncellenmiş TikTok kaydını kaydet
    const updatedTiktok = await tiktok.save();

    // Güncellenmeden sonraki veriyi kontrol et
    console.log("Güncellenmiş Veri: ", updatedTiktok);

    // Güncellenmiş veriyi döndür
    res.json({
      _id: updatedTiktok._id,
      title: updatedTiktok.title,
      description: updatedTiktok.description,
      photo: updatedTiktok.photo,
      price: updatedTiktok.price, // Fiyatı da yanıt olarak ekleyin
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
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

export { tiktokPost, getTiktok, getByIdTiktok, deleteById ,tiktokUpdateProfil };
