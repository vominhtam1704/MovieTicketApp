import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:5000/api/movies';

const EditMoviePage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_URL}/${id}`)
      .then(res => res.json())
      .then(data => {
        setMovie(data);
        setLoading(false);
      });
  }, [id]);

  const handleChange = e => {
    const { name, value, files } = e.target;
    setMovie(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    Object.entries(movie).forEach(([key, val]) => {
      if (val) formData.append(key, val);
    });

    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    if (res.ok) {
      alert('Cập nhật thành công');
      navigate('/admin');
    } else {
      alert('Cập nhật thất bại');
    }
  };

  if (loading || !movie) return <div className="container py-4">Đang tải dữ liệu...</div>;

  return (
    <div className="container py-4">
      <h2>Sửa phim</h2>
      <div className="row g-2">
        <div className="col-md-6">
          <input className="form-control mb-2" name="title" value={movie.title} onChange={handleChange} placeholder="Tên phim" />
          <input className="form-control mb-2" name="genre" value={movie.genre} onChange={handleChange} placeholder="Thể loại" />
          <input className="form-control mb-2" name="director" value={movie.director} onChange={handleChange} placeholder="Đạo diễn" />
          <input className="form-control mb-2" name="duration" value={movie.duration} onChange={handleChange} placeholder="Thời lượng (phút)" />
          <input className="form-control mb-2" name="subtitle" value={movie.subtitle} onChange={handleChange} placeholder="Phụ đề" />
          <input className="form-control mb-2" name="age" value={movie.age} onChange={handleChange} placeholder="Độ tuổi" />
        </div>
        <div className="col-md-6">
          <input type="date" className="form-control mb-2" name="release_date" value={movie.release_date ? movie.release_date.substring(0,10) : ''} onChange={handleChange} />
          <textarea className="form-control mb-2" name="description" value={movie.description} onChange={handleChange} rows={2} placeholder="Mô tả" />
          <textarea className="form-control mb-2" name="content" value={movie.content} onChange={handleChange} rows={3} placeholder="Nội dung phim" />
          <input type="file" className="form-control mb-2" name="image" accept="image/*" onChange={handleChange} />
          <input type="file" className="form-control mb-2" name="video" accept="video/*" onChange={handleChange} />
        </div>
      </div>
      <button className="btn btn-primary mt-3" onClick={handleUpdate}> Lưu</button>
      <button className="btn btn-secondary mt-3 ms-2" onClick={() => navigate('/admin')}> Hủy</button>
    </div>
  );
};

export default EditMoviePage;