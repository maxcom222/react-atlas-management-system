import React,{ useState } from "react";
import axios from "axios";
import { getImageURL } from "app/functions";

export const EditableAvatar = (props) =>{ 
	const { onChange, name, src } = props;
	const [ state, setState ] = useState({
		file: ""
	});

	React.useEffect(() => {
		if(src) {
			setState({
				...state,
				src: src
			})
		}
	}, [src])

	React.useEffect(() => {
		if(state.file) {
			onChange({
				target: {
					value: state.data,
					name: name
				}
			});	
		}
	}, [state.file])

	const toBase64 = file => new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = error => reject(error);
	});

	const handleFileChange = async (e) => {
		const file = e.target.files[0];
		if(file) {
			setState({
				...state,
				file: await toBase64(file),
				data: file
			});
		}			
	}

	return 	<>
		<img 
			src={state.file ? state.file : state.src && getImageURL(src)}
		/>
		<input
			type="file"
			accept="image/*"
			style={{
				position: "absolute",
				maxWidth: "100%",
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				opacity: 0,
				cursor: "pointer"
			}}
			onChange={(event) => handleFileChange(event)}
		/>
		<input type="hidden" name={name} value={state.file} />
	</>;
}