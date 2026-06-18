const db = require("../models");
const Book = db.Book;
const { Op } = require("sequelize");
const rabbitmq = require("../config/rabbitmq");


// ======================================================
// GET ALL BOOKS
// ======================================================
exports.getAllBooks = async (req, res) => {
    try {
        const { search, is_free, language, sort_by, order } = req.query;

        let whereClause = {};

        // search
        if (search) {
            whereClause[Op.or] = [
                { title: { [Op.like]: `%${search}%` } },
                { author: { [Op.like]: `%${search}%` } },
                { sinopsis: { [Op.like]: `%${search}%` } }
            ];
        }

        if (is_free !== undefined) {
            whereClause.is_free = is_free === "true";
        }

        if (language) {
            whereClause.language = language;
        }

        let orderClause = [["created_at", "DESC"]];

        if (sort_by) {
            orderClause = [[
                sort_by,
                order && order.toUpperCase() === "ASC" ? "ASC" : "DESC"
            ]];
        }

        const books = await Book.findAll({
            where: whereClause,
            order: orderClause
        });

        res.json({
            success: true,
            count: books.length,
            data: books
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch books"
        });
    }
};


// ======================================================
// GET BOOK BY ID
// ======================================================
exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findByPk(req.params.id);

        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found"
            });
        }

        await book.increment("views");
        await book.reload();

        res.json({
            success: true,
            data: book
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch book"
        });
    }
};


// ======================================================
// CREATE BOOK + SEND RABBITMQ MESSAGE
// ======================================================
exports.createBook = async (req, res) => {
    try {
        const {
            title,
            author,
            rating,
            views,
            is_free,
            language,
            sinopsis,
            story,
            image
        } = req.body;

        // validation
        if (!title || !author || !sinopsis || !story) {
            return res.status(400).json({
                success: false,
                message: "Title, author, sinopsis, and story are required"
            });
        }

        // save database
        const book = await Book.create({
            title,
            author,
            rating: rating || 0,
            views: views || 0,
            is_free: is_free || false,
            language: language || "English",
            sinopsis,
            story,
            image
        });

        // ===============================
        // SEND MESSAGE TO RABBITMQ
        // ===============================
        console.log("🔥 Sending message to RabbitMQ...");

        const result = await rabbitmq.sendToQueue(
            "book_created",
            {
                event: "book.created",
                timestamp: new Date().toISOString(),
                data: {
                    id: book.id,
                    title: book.title,
                    author: book.author,
                    is_free: book.is_free,
                    language: book.language
                }
            }
        );

        console.log("✅ RabbitMQ Result:", result);

        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: book
        });

    } catch (error) {
        console.error("CREATE BOOK ERROR:", error);

        res.status(500).json({
            success: false,
            message: "Failed to create book",
            error: error.message    
        });
    }
};


// ======================================================
// UPDATE BOOK (PUT)
// ======================================================
exports.updateBook = async (req, res) => {
    try {
        const book = await Book.findByPk(req.params.id);

        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found"
            });
        }

        await book.update(req.body);

        res.json({
            success: true,
            message: "Book updated successfully",
            data: book
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to update book"
        });
    }
};


// ======================================================
// PATCH BOOK
// ======================================================
exports.patchBook = async (req, res) => {
    try {
        const book = await Book.findByPk(req.params.id);

        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found"
            });
        }

        await book.update(req.body);

        res.json({
            success: true,
            message: "Book patched successfully",
            data: book
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to patch book"
        });
    }
};


// ======================================================
// DELETE BOOK
// ======================================================
exports.deleteBook = async (req, res) => {
    try {
        const book = await Book.findByPk(req.params.id);

        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found"
            });
        }

        await book.destroy();

        res.json({
            success: true,
            message: "Book deleted successfully"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to delete book"
        });
    }
};