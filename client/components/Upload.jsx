import React from 'react';
import ImageUploader from 'react-images-upload';
import axios from 'axios';
class Upload extends React.Component {
	
    constructor(props) {
        super(props);
        this.state = { pictures: [] };
        this.onDrop = this.onDrop.bind(this);
    }

    onDrop(picture) {
        let data = new FormData()
        console.log(picture[0]);
        // data.append('name', picture[0].name)
        // data.append('mimetype', 'image/png')
        // data.set('encoding', '7bit')
        data.append('image', picture[0])
        console.log(data);
        axios.post('/img', data)
        .then(({data}) => {
            axios.post('/imgProfile', {user_id: this.props.userId, url: data})
        }).then(() => setTimeout(this.props.trigger, 500))
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
    }

    render() {
        return (
            <ImageUploader
                withLabel={false}
                withIcon={false}
                buttonText='Upload Image'
                onChange={this.onDrop}
                imgExtension={['.jpg', '.png']}
                maxFileSize={5242880}
            />
        );
    }
}

export default Upload