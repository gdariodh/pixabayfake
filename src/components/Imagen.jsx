import React from 'react';
import './css/alt.css'
import PropTypes from 'prop-types'

const Imagen = ({image}) => {

   const { largeImageURL, webformatURL, downloads, views, likes, tags, userImageURL, pageURL, user} = image;

   const imageUser = userImageURL ? (
     <div className='card' style={{ width: "4rem", margin:'auto' }}>
       <a href={pageURL}>
         <img className='card-img-top' src={userImageURL} alt={user}/>
       </a>
     </div>
   ) : null;

    return ( 
       <div className='col-12 col-sm-6 col-md-4 col-lg-3 mb-4'>
             <div className='card'>
                
             <a href={largeImageURL}
                target='_blank'
                rel='noopener noreferrer'
                >
                <img 
                 src={webformatURL} alt={tags} 
                 className='card-img-top'/>

                </a>

                <div className='card-body'>
                 <p className='card-text'>{views} Vistas</p>
                 <p className='card-text'>{likes} Me Gusta</p>
                 <p className='card-text'>{downloads} Descargas</p>
                 {imageUser}
                 <p className='card-text' style={{ textAlign:'center' }}><a href={pageURL}>By: {user}</a></p>
               
                </div>

                <div className='card-footer'>
                
                <a href={largeImageURL}
                target='_blank'
                rel='noopener noreferrer'
                className='btn btn-primary btn-block'
                >ver imagen</a>
               
                </div>

                
             </div>
             
       </div>
     );
}

Imagen.propTypes = {
  image:PropTypes.object.isRequired
}
 
export default Imagen;