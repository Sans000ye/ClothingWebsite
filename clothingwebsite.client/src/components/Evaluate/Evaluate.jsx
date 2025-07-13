import React, { useEffect, useRef } from "react";
import "./Evaluate.css";

const Evaluate = () => {
    const testimonialsRef = useRef(null);
    const prevButtonRef = useRef(null);
    const nextButtonRef = useRef(null);

    useEffect(() => {
        const testimonials = testimonialsRef.current;
        const prevButton = prevButtonRef.current;
        const nextButton = nextButtonRef.current;

        if (!testimonials || !prevButton || !nextButton) return;

        const scrollStep = 350; // Điều chỉnh khoảng cách cuộn

        const scrollLeft = () => {
            testimonials.scrollBy({ left: -scrollStep, behavior: "smooth" });
        };

        const scrollRight = () => {
            testimonials.scrollBy({ left: scrollStep, behavior: "smooth" });
        };

        prevButton.addEventListener("click", scrollLeft);
        nextButton.addEventListener("click", scrollRight);

        return () => {
            prevButton.removeEventListener("click", scrollLeft);
            nextButton.removeEventListener("click", scrollRight);
        };
    }, []);

    return (
        <div className="testimonials-container">
            <h2>OUR HAPPY CUSTOMERS</h2>
            <button ref={prevButtonRef} className="prev-btn">⬅</button>
            <div className="testimonials" ref={testimonialsRef}>
                <div className="testimonial-card">
                    <div className="rating">⭐⭐⭐⭐⭐</div>
                    <h3>Sarah M. <span className="verified">✔</span></h3>
                    <p>"I'm blown away by the quality and style of the clothes I received from Shop.co..."</p>
                </div>
                <div className="testimonial-card">
                    <div className="rating">⭐⭐⭐⭐⭐</div>
                    <h3>Alex K. <span className="verified">✔</span></h3>
                    <p>"Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co..."</p>
                </div>
                <div className="testimonial-card">
                    <div className="rating">⭐⭐⭐⭐⭐</div>
                    <h3>James L. <span className="verified">✔</span></h3>
                    <p>"As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co..."</p>
                </div>
                <div className="testimonial-card">
                    <div className="rating">⭐⭐⭐⭐⭐</div>
                    <h3>James L. <span className="verified">✔</span></h3>
                    <p>"As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co..."</p>
                </div>
                <div className="testimonial-card">
                    <div className="rating">⭐⭐⭐⭐⭐</div>
                    <h3>James L. <span className="verified">✔</span></h3>
                    <p>"As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co..."</p>
                </div>
                <div className="testimonial-card">
                    <div className="rating">⭐⭐⭐⭐⭐</div>
                    <h3>James L. <span className="verified">✔</span></h3>
                    <p>"As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co..."</p>
                </div>
            </div>
            <button ref={nextButtonRef} className="next-btn">➡</button>
        </div>
    );
};

export default Evaluate;
