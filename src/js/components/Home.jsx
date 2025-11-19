import React from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import { Todolistreact } from "./Todolistreact";

//create your first component
const Home = () => {
	return (
		<div>
			<Todolistreact/>
		</div>
	);
};

export default Home;