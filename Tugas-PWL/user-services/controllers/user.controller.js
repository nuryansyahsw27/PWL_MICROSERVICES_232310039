const User = require('../models/user.model');

// REGISTER
const register = async (req, res) => {
    try {
        const { email, username, password } = req.body;

        const existingUser = await User.findOne({
            $or: [
                { email },
                { username }
            ]
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Email atau username sudah digunakan'
            });
        }

        const newUser = await User.create({
            email,
            username,
            password
        });

        res.status(201).json({
            success: true,
            message: 'Register berhasil',
            user: {
                id: newUser._id,
                email: newUser.email,
                username: newUser.username
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// LOGIN
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({
            email,
            password
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Email atau password salah'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Login berhasil',
            user: {
                id: user._id,
                email: user.email,
                username: user.username
            },
            token: `token-${user._id}`
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// PROFILE
const getProfile = async (req, res) => {
    try {
        const token =
            req.headers.authorization?.replace(
                'Bearer ',
                ''
            );

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Token tidak ditemukan'
            });
        }

        const userId = token.replace(
            'token-',
            ''
        );

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User tidak ditemukan'
            });
        }

        res.status(200).json({
            success: true,
            user: {
                id: user._id,
                email: user.email,
                username: user.username
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// UPDATE PROFILE
const updateProfile = async (req, res) => {
    try {
        const token =
            req.headers.authorization?.replace(
                'Bearer ',
                ''
            );

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Token tidak ditemukan'
            });
        }

        const userId = token.replace(
            'token-',
            ''
        );

        const updatedUser =
            await User.findByIdAndUpdate(
                userId,
                req.body,
                {
                    new: true,
                    runValidators: true
                }
            );

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: 'User tidak ditemukan'
            });
        }

        res.status(200).json({
            success: true,
            message:
                'Profile berhasil diperbarui',
            user: {
                id: updatedUser._id,
                email:
                    updatedUser.email,
                username:
                    updatedUser.username
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// CRUD USER
const getAllUsers = async (req, res) => {
    try {
        const users =
            await User.find();

        res.status(200).json({
            success: true,
            data: users
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getUserById = async (
    req,
    res
) => {
    try {
        const user =
            await User.findById(
                req.params.id
            );

        if (!user) {
            return res.status(404).json({
                success: false,
                message:
                    'User tidak ditemukan'
            });
        }

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const createUser = async (
    req,
    res
) => {
    try {
        const user =
            await User.create(
                req.body
            );

        res.status(201).json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const updateUser = async (
    req,
    res
) => {
    try {
        const user =
            await User.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true
                }
            );

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const deleteUser = async (
    req,
    res
) => {
    try {
        await User.findByIdAndDelete(
            req.params.id
        );

        res.status(200).json({
            success: true,
            message:
                'User berhasil dihapus'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    register,
    login,
    getProfile,
    updateProfile,
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};