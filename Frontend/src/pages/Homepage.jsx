const Homepage = () => {
    return (
        <div className="bg-dark vw-100 overflow-hidden">
            {/* Your existing homepage content */}
            <div className="position-absolute w-100" 
                 style={{
                    height: "90vh",
                     background: "linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(26,26,26,0.85) 100%)",
                     zIndex: 0
                 }}></div>
            
            <div className="position-relative" style={{zIndex: 1, height: "90vh"}}>
                <div className="container-fluid d-flex flex-column align-items-center justify-content-center text-light h-100">
                    <div className="container-fluid w-75 p-0">
                        <div className="mb-5">
                            <h1 className="my-4 fs-1 lh-base font-monospace fw-bold">
                                Your Ultimate Quiz Companion –{" "}
                                <span className="text-warning" style={{fontSize: "60px", textShadow: "0 0 20px rgba(255,193,7,0.5)"}}>
                                    QuizzIE
                                </span>
                            </h1>
                            <div className="bg-warning mb-4" style={{width: "80px", height: "4px", borderRadius: "2px"}}></div>
                        </div>

                        <p className="fs-5 text-light mb-4 lh-lg" style={{opacity: 0.9}}>
                            Whether you're a <span className="text-info fw-semibold">student</span> looking to practice, an{" "}
                            <span className="text-success fw-semibold">admin</span> creating engaging quizzes, or a{" "}
                            <span className="text-warning fw-semibold">lifelong learner</span> wanting to sharpen your skills - 
                            QuizzIE offers a dynamic and immersive way to challenge your mind and expand your knowledge.
                        </p>

                        <div className="text-center mt-5">
                            <button className="btn btn-warning btn-lg px-5 py-3 fw-bold text-dark rounded-pill shadow" 
                                    style={{fontSize: "1.1rem"}}>
                                Explore Quizzes 🚀
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Homepage;