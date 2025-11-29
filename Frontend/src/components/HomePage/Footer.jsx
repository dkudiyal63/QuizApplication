const Footer = () => {
   return (
      <footer className="mt-5" style={{ 
         background: "var(--secondary-bg)", 
         borderTop: "1px solid var(--border-color)",
         padding: "var(--spacing-xl) 0"
      }}>
         <div className="container text-center">
            <p className="text-secondary mb-0">
               2023 - Present &copy; Quizzie - Where Knowledge Meets Adventure
            </p>
         </div>
      </footer>
   );
};

export default Footer;
