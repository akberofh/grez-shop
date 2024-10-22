import jwt from 'jsonwebtoken';

const generateToken = (res, userId , userType) => {
    const token = jwt.sign({ userId ,userType}, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });

    res.cookie('jwt', token, {
        httpOnly: false,
        secure: process.env.NODE_ENV !== 'development', // Production ortamında secure true olmalı
        sameSite: process.env.NODE_ENV !== 'development' ? 'None' : 'Strict', // Production için None, local için Strict
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 gün
    });
};

export default generateToken;
