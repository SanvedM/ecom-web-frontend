import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import Products from "../components/Products";
import About from "../components/About";

export default function Home() {
    return (
        <div className="font-sans">
            <Hero />
            <div id="categories">
                <Categories />
            </div>

            <Products />
            <div id="contact">
                <About />

            </div>
        </div>
    );
}