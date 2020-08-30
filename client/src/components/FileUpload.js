import React from 'react'
import Resizer from 'react-image-file-resizer'
import axios from 'axios'

const FileUpload = ({ loading, setLoading, values, setValues, user }) => {

    const fileResizeAndUpload = async (event) => { //npm package react-image-file-resizer
        setLoading(true)
        let fileInput = false
        if (event.target.files[0]) {
            fileInput = true
        }
        if (fileInput) {
            Resizer.imageFileResizer(
                event.target.files[0],
                300,
                300,
                'JPEG',
                100,
                0,
                async uri => {
                    try {
                        const response = await axios.post(`${process.env.REACT_APP_REST_ENDPOINT}/uploadimages`, { image: uri }, {
                            headers: {
                                authtoken: user.token
                            }
                        })
                        console.log(response)
                        setValues({
                            ...values,
                            images: [...values.images, response.data]
                        })
                    } catch (error) {
                        console.log('Error uploading photo(s)', error)
                    } finally {
                        setLoading(false)
                    }

                },
                'base64'
            );
        }
    }

    const handleImageRemove = async (id) => {
        try {
            setLoading(true)
            await axios.post(`${process.env.REACT_APP_REST_ENDPOINT}/removeimage`, {
                public_id: id
            }, {
                headers: {
                    authtoken: user.token
                }
            })
            let filteredImages = values.images.filter(image => image.public_id !== id)
            setValues({ ...values, images: filteredImages })

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }

    }

    return (
        <>
            <div className="row">
                <div className="col-md-8 m-auto">
                    {values.images.map(image => {
                        console.log(image)
                        return (
                            <img
                                className='m-2'
                                src={image.url}
                                key={image.public_id}
                                alt={image.public_id}
                                style={{ height: '100px' }}
                                onClick={() => handleImageRemove(image.public_id)}
                            />
                        )
                    }
                    )}
                </div>
            </div>
            <div className="row">
                <div className="col-md-8 m-auto">
                    <label className='btn text-primary'>
                        {!loading ? "+ Add Image"
                            :
                            <>
                                <span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
                                Uploading...
                            </>
                        }
                        <input
                            disabled={loading}
                            hidden
                            accept="image/*"
                            placeholder='Images'
                            type="file"
                            onChange={fileResizeAndUpload}
                        />
                    </label>
                </div>
            </div>
        </>
    )
}

export default FileUpload
