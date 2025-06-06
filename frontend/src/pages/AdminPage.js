import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:5000/api/movies';

const AdminPage = () => {
  const [newMovie, setNewMovie] = useState({
    title: '',
    genre: '',
    director: '',
    duration: '',
    release_date: '',
    description: '',
    subtitle: '',
    age: '',
    content: '',
    image: null,
    video: null
  });
  const navigate = useNavigate();

  // Chặn user thường truy cập trang admin
  React.useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (!token || role !== 'Admin') {
      navigate('/');
    }
    // Không fetchMovies ở đây!
    // eslint-disable-next-line
  }, [navigate]);

  const handleAddMovie = async () => {
    const { title, genre, director, duration, release_date, description, subtitle, age, content } = newMovie;
    if (!title || !genre || !director || !duration || !release_date || !description || !subtitle || !age || !content) {
      alert("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    const token = localStorage.getItem('token');
    const formData = new FormData();
    Object.entries(newMovie).forEach(([key, val]) => {
      if (val) formData.append(key, val);
    });

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        alert('Thêm phim thành công');
        setNewMovie({
          title: '', genre: '', director: '', duration: '', release_date: '', description: '', subtitle: '', age: '', content: '', image: null, video: null
        });
      } else {
        alert(data.error || 'Lỗi khi thêm phim');
      }
    } catch (err) {
      alert('Lỗi khi gửi yêu cầu');
    }
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">🎬 Quản lý phim</h2>

      <div className="border rounded p-3 mb-5">
        <h5>Thêm phim mới</h5>
        <div className="row g-2">
          <div className="col-md-6">
            <input className="form-control mb-2" placeholder="Tên phim" value={newMovie.title} onChange={e => setNewMovie({ ...newMovie, title: e.target.value })} />
            <input className="form-control mb-2" placeholder="Thể loại" value={newMovie.genre} onChange={e => setNewMovie({ ...newMovie, genre: e.target.value })} />
            <input className="form-control mb-2" placeholder="Đạo diễn" value={newMovie.director} onChange={e => setNewMovie({ ...newMovie, director: e.target.value })} />
            <input className="form-control mb-2" placeholder="Thời lượng (phút)" value={newMovie.duration} onChange={e => setNewMovie({ ...newMovie, duration: e.target.value })} />
            <input className="form-control mb-2" placeholder="Phụ đề" value={newMovie.subtitle} onChange={e => setNewMovie({ ...newMovie, subtitle: e.target.value })} />
            <input className="form-control mb-2" placeholder="Độ tuổi (VD: 16+)" value={newMovie.age} onChange={e => setNewMovie({ ...newMovie, age: e.target.value })} />
          </div>
          <div className="col-md-6">
            <input type="date" className="form-control mb-2" value={newMovie.release_date} onChange={e => setNewMovie({ ...newMovie, release_date: e.target.value })} />
            <textarea className="form-control mb-2" placeholder="Mô tả" value={newMovie.description} onChange={e => setNewMovie({ ...newMovie, description: e.target.value })} rows={2} />
            <textarea className="form-control mb-2" placeholder="Nội dung phim" value={newMovie.content} onChange={e => setNewMovie({ ...newMovie, content: e.target.value })} rows={3} />
            <input type="file" className="form-control mb-2" accept="image/*" onChange={e => setNewMovie({ ...newMovie, image: e.target.files[0] })} />
            <input type="file" className="form-control mb-2" accept="video/*" onChange={e => setNewMovie({ ...newMovie, video: e.target.files[0] })} />
          </div>
        </div>
        <button className="btn btn-success mt-3" onClick={handleAddMovie}>➕ Thêm phim</button>
      </div>
    </div>
  );
};

export default AdminPage;