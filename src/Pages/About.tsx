//import "../About.css";


function About() {


    return (
        <>
        <section className="py-5">
	<div className="container">
		<div className="row align-items-center gx-4">
			<div className="col-md-5">
				<div className="ms-md-2 ms-lg-5"><img className="img-fluid rounded-3" src="/public/pers1.png"/></div>
			</div>
			<div className="col-md-6 offset-md-1">
				<div className="ms-md-2 ms-lg-5">
					<h2 className="display-5 fw-bold">Om mig</h2>
					<p className="lead">Jag som skapat denna sida heter Oskar Sundström</p>
					<p className="lead mb-0">Anledningen att sidan startades var för att det alltid finns behov av bra nyhetsidor.</p>
				</div>
			</div>
		</div>
	</div>
</section>
        </>
    );
}

export default About;