import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:5000/api/movies';

const EditMoviePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [videoPreview, setVideoPreview] = useState('');

  useEffect(() => {
    fetch(`${API_URL}/${id}`)
      .then(res => res.json())
      .then(data => {
        setMovie(data);
        setImagePreview(`http://localhost:5000${data.image || ''}`);
        setVideoPreview(`http://localhost:5000${data.video || ''}`);
      });
  }, [id]);

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (files) {
      const file = files[0];
      if (name === 'image') setImagePreview(URL.createObjectURL(file));
      if (name === 'video') setVideoPreview(URL.createObjectURL(file));
      setMovie(prev => ({ ...prev, [name]: file }));
    } else {
      setMovie(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem('token');
    const formData = new FormData();

    // Chỉ thêm các field cơ bản
    const fields = [
      'title', 'genre', 'director', 'main_actor', 'duration',
      'language', 'country', 'release_date', 'description',
      'subtitle', 'age', 'content'
    ];
    fields.forEach(field => {
      if (movie[field]) formData.append(field, movie[field]);
    });

    // Gửi lại đường dẫn ảnh/video cũ nếu không chọn ảnh mới
    formData.append('oldImage', movie.image?.name ? '' : movie.image || '');
    formData.append('oldVideo', movie.video?.name ? '' : movie.video || '');

    // Thêm file nếu có
    if (movie.image instanceof File) formData.append('image', movie.image);
    if (movie.video instanceof File) formData.append('video', movie.video);

    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
      body: formData
    });

    const data = await res.json();
    if (res.ok) {
      alert(' Cập nhật thành công!');
      navigate('/');
    } else {
      alert(data.error || 'Cập nhật thất bại!');
    }
  };

  if (!movie) return <p className="container py-4">Đang tải...</p>;

  return (
    <div className="container py-4">
      <h2 className="mb-3">✏️ Cập nhật phim</h2>
      <div className="row g-2">
        {['title', 'genre', 'director', 'main_actor', 'duration', 'language', 'country'].map(field => (
          <div className="col-md-6" key={field}>
            <input
              className="form-control mb-2"
              name={field}
              value={movie[field] || ''}
              onChange={handleChange}
              placeholder={field.toUpperCase()}
            />
          </div>
        ))}
        <div className="col-md-6">
          <input
            type="date"
            className="form-control mb-2"
            name="release_date"
            value={movie.release_date?.substring(0, 10)}
            onChange={handleChange}
          />
        </div>
        {['subtitle', 'age'].map(field => (
          <div className="col-md-6" key={field}>
            <input
              className="form-control mb-2"
              name={field}
              value={movie[field] || ''}
              onChange={handleChange}
              placeholder={field.toUpperCase()}
            />
          </div>
        ))}
        {['description', 'content'].map(field => (
          <div className="col-12" key={field}>
            <textarea
              className="form-control mb-2"
              name={field}
              value={movie[field] || ''}
              onChange={handleChange}
              placeholder={field.toUpperCase()}
              rows={2}
            />
          </div>
        ))}

        {/* Ảnh */}
        <div className="col-md-6">
          <label className="form-label">Ảnh hiện tại</label>
          {imagePreview && (
            <div className="mb-2">
              <img src={imagePreview} alt="preview" width="100%" style={{ maxHeight: 200, objectFit: 'contain' }} />
            </div>
          )}
          <input type="file" className="form-control" name="image" onChange={handleChange} accept="image/*" />
        </div>

        {/* Video */}
        <div className="col-md-6">
          <label className="form-label">Trailer hiện tại</label>
          {videoPreview && (
            <div className="mb-2">
              <video width="100%" height="180" controls>
                <source src={videoPreview} type="video/mp4" />
              </video>
            </div>
          )}
          <input type="file" className="form-control" name="video" onChange={handleChange} accept="video/*" />
        </div>
      </div>

      <button className="btn btn-primary mt-3" onClick={handleUpdate}>
         Lưu thay đổi
      </button>
      <button className="btn btn-secondary mt-3 ms-2" onClick={() => navigate('/')}>
         Hủy
      </button>
    </div>
  );
};

export default EditMoviePage;
