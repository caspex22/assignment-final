const Books = require('../models/Product');


exports.getAllBooks = async (req, res) => {
    try {
        const Books = await Books.find(); 
        if (Books.length > 0) {
            res.status(200).json({ "message": 'Books found!', "data": Books });
          } else {
            res.status(404).json({ "message": 'Books empty!' });
          }
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
};

exports.createBooks = async (req, res) => {
  try {
    const newCar = new Books(req.body);
    const savedCar = await newCar.save();
    res.status(201).json(savedCar);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getBooksById = async (req, res) => {
    const carId = req.params.id;
    try {
      const car = await Books.findById(carId);
      if (!car) {
        return res.status(404).json({ error: 'Car not found' });
      }
      res.status(200).json(car);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.updateBooksById = async (req, res) => {
    const carId = req.params.id;
    const updatedCarData = req.body; 
    try {
      const updatedCar = await Books.findByIdAndUpdate(carId, updatedCarData, { new: true });
      if (!updatedCar) {
        return res.status(404).json({ error: 'Car not found' });
      }
      res.status(200).json(updatedCar);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.deleteBooksById = async (req, res) => {
    const carId = req.params.id;
    try {
      const deletedCar = await Books.findByIdAndRemove(carId);
      if (!deletedCar) {
        return res.status(404).json({ error: 'Car not found' });
      }
      res.status(200).json(deletedCar);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
}