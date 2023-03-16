const express = require('express');
const mongoose = require('mongoose');
const {book} = require('../Model/bookModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');

module.exports.Search = asyncHandler(async(req,res)=>{

    const page = parseInt(req.query.page)-1 || 0;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || "";
    let sort = req.query.sort || "buys";
    let genre = req.query.genre || "All";

    const genreOption = [
        "Fantasy",
        "Adventure",
        "Romance",
        "Self Help",
        "Mystery",
        "Horror",
        "Thriller",
        "Paranormal",
        "Historical",
        "Science Fiction",
        "Children's"
    ];

    genre === "All"
        ?(genre = [...genreOption])
        :(genre = req.query.genre.split(','));
    req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);
    console.log("req...serach   ", genre);
    let sortBy = {};

    if(sort[1]){
        sortBy[sort[0] = sort[1]];
    } else {
        sortBy[sort[0]] = "asc";
    }

    const books = await book.find({name: {$regex: search, $options:"i"}})
        .where("genres")
        .in([...genre])
        .sort(sortBy)
        .skip(page * limit)
        .limit(limit);

    const total = await book.find({
        name: {$regex: search, $options:"i"},
        genres: {$in: [...genre]}
    });

    const response = {
        error:false,
        total,
        page: page+1,
        limit,
        genres: genre,
        books
    };

    if(books) {
        res.status(200).json(response);
    }
    else {
        res.status(400).json({message:"Wrong email or password"});
    }
});

module.exports.Add = asyncHandler(async(req,res)=>{
    console.log(req.body);
    const{name, imageurl, author, genres, description} = req.body;

    req.body.buys ?(buys = req.body.buys) :(buys = 0);

    if(!name || !imageurl || !author || !genres){
        res.status(400);
        throw new Error("All fields are required");
    }
    const exists = await book.findOne({name:name});
    if(exists){
        res.status(400);
        throw new Error("User Exits/ Email already used!");
    }

    const addBook = await book.create({
        name: name,
        imageurl: imageurl,
        author: author,
        genres: genres,
        description: description,
        buys: buys
    })

    res.status(400).json(addBook);

});