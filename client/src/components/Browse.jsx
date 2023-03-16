import {useEffect, useState} from "react";
import axios from "axios";


const base_url = "http://localhost:7000/book/search";

const Browse = () => {
    const [obj, setObj] = useState({});
    const [sort, setSort ] = useState({sort: "rating", order: "desc"});
    const [filterGenre, setFilterGenre] = useState([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [display, setDisplay] = useState(false);
    const mapper = ["one", "two", "three", "four"];
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

    const clickRes = (id) => {
        if(id == "-1"){
            alert("go to reddit maan!!!"+ id);
        }
    }

    const addFilter = (event) => {
        console.log(event.target.value)
        setFilterGenre([ ...filterGenre, event.target.value ])
    }

    const removeFilter = (event) => {
        console.log(event.target.value)
        setFilterGenre(filterGenre.filter( gen => gen !== event.target.value ))
    }

    const bookBox = (bookObject) => {
        return (
            <div className="bg-green-300 p-3 h-fit w-max">
                <div
                    className="w-[18vw] aspect-w-1 aspect-h-1 h-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 ">
                    <img src={bookObject.imageurl}
                         alt="Front of men&#039;s Basic Tee in black."
                         className="h-full w-full object-cover object-center lg:h-full lg:w-full"/>
                </div>
                <div className="mt-4 flex justify-between">
                    <div>
                        <h3 className="text-sm text-gray-700">
                            <a href="#">
                                <span aria-hidden="true" className="flex overflow-visible"></span>
                                {bookObject.genres}
                            </a>
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">Readers: {bookObject.buys}</p>
                    </div>
                    <button type="button"
                            onClick={() => clickRes(bookObject._id)}
                            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-1 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                        Read
                    </button>
                </div>
            </div>
        )
    }
    useEffect(() => {
        const getAllMovies = async () => {
            console.log(search)
            try{
                const url = `${base_url}?page=${page}&sort=${sort.sort},${sort.order}&genre=${filterGenre.toString()}&search=${search}`;
                const { data } = await axios.get(url);
                setObj(data);
                setDisplay(true);
                console.log(data);
            } catch (e) {
                console.log(e);
            }
        }
        getAllMovies();
    }, [sort, filterGenre, page, search]);

    return(
        <>
            <div className={"w-screen grid grid-flow-col auto-cols-auto"}>
                <div>
                    <input type="text" name="search" id="search" className="p-2 m-5  font-extrabold text-green-800"
                           value={search}
                           placeholder={"SEARCH"}
                           onChange={(event)=>{
                               setSearch(event.target.value)
                           }}/>
                    {filterGenre.map((val) => {
                        return (
                            <>
                                <button
                                    value={val}
                                    className="m-2 bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-blue-500 rounded"
                                    onClick={(event) => removeFilter(event)}>
                                    {val}
                                </button>

                            </>
                        )
                    })}
                </div>
                <div>
                    {genreOption.map((val) => {
                        if( !filterGenre.includes(val) ){
                            return (
                                <>
                                    <button
                                        value={val}
                                        className="m-2 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-indigo-700 hover:border-blue-500 rounded"
                                        onClick={(event) => addFilter(event)}>
                                        {val}
                                    </button>
                                </>
                            )
                        }

                    })}
                </div>

            </div>
            <div className="mt-6 grid grid-cols-4 gap-y-10 gap-x-6 ">

                    {
                        display? (
                            <>
                                {obj.books.map((oneBook) => {
                                    return (
                                        <>
                                            {bookBox(oneBook)}
                                        </>
                                    )
                                })}
                            </>
                        ) : (
                            <>
                                {
                                    mapper.map((countNo) => {
                                        return (
                                            <>{bookBox({author:"Demo Demo", buys:0,genres:['Demo Demo'], imageurl:"https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/51tAwFZt2XL._SX331_BO1,204,203,200_.jpg"
                                                ,name:"Demo Demo"
                                                ,__v:0
                                                ,_id:"-1"})}</>
                                        )
                                    })
                                }
                            </>
                        )
                    }

            </div>
        </>
    )
}

export default Browse;