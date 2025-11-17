import React from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import { Todolist } from "./Todolist";

//create your first component
const Home = () => {
	return (
		<div>
			<Todolist/>
		</div>
	);
};

export default Home;