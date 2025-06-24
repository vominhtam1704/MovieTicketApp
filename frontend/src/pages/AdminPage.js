// AdminPage.js - Trang Quản trị: Thêm phim mới
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:5000/api/movies';

const AdminPage = () => {
  const [phimMoi, setPhimMoi] = useState({
    title: '', genre: '', director: '', main_actor: '', duration: '', language: '',
    country: '', release_date: '', description: '', subtitle: '', age: '', content: '',
    image: null, video: null
  });
  const dieuHuong = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (!token || role !== 'Admin') dieuHuong('/');
  }, [dieuHuong]);

  const xuLyThayDoi = (e) => {
    const { name, value, files } = e.target;
    setPhimMoi(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const guiLenMayChu = async () => {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    Object.entries(phimMoi).forEach(([key, val]) => {
      if (val) formData.append(key, val);
    });

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });
      const data = await res.json();
      if (res.ok) {
        alert('✅ Thêm phim thành công!');
        setPhimMoi({
          title: '', genre: '', director: '', main_actor: '', duration: '', language: '',
          country: '', release_date: '', description: '', subtitle: '', age: '', content: '',
          image: null, video: null
        });
      } else {
        alert(data.error || '❌ Lỗi khi thêm phim!');
      }
    } catch (err) {
      alert('❌ Không thể kết nối đến máy chủ.');
    }
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-primary">🎬 Quản trị - Thêm phim mới</h2>

      <div className="row g-2">
        <div className="col-md-6">
          <label className="form-label">Tên phim</label>
          <input className="form-control mb-2" name="title" value={phimMoi.title} onChange={xuLyThayDoi} />
        </div>
        <div className="col-md-6">
          <label className="form-label">Thể loại</label>
          <input className="form-control mb-2" name="genre" value={phimMoi.genre} onChange={xuLyThayDoi} />
        </div>
        <div className="col-md-6">
          <label className="form-label">Đạo diễn</label>
          <input className="form-control mb-2" name="director" value={phimMoi.director} onChange={xuLyThayDoi} />
        </div>
        <div className="col-md-6">
          <label className="form-label">Diễn viên chính</label>
          <input className="form-control mb-2" name="main_actor" value={phimMoi.main_actor} onChange={xuLyThayDoi} />
        </div>
        <div className="col-md-6">
          <label className="form-label">Thời lượng (phút)</label>
          <input className="form-control mb-2" name="duration" value={phimMoi.duration} onChange={xuLyThayDoi} />
        </div>
        <div className="col-md-6">
          <label className="form-label">Ngôn ngữ</label>
          <input className="form-control mb-2" name="language" value={phimMoi.language} onChange={xuLyThayDoi} />
        </div>
        <div className="col-md-6">
          <label className="form-label">Quốc gia</label>
          <input className="form-control mb-2" name="country" value={phimMoi.country} onChange={xuLyThayDoi} />
        </div>
        <div className="col-md-6">
          <label className="form-label">Ngày khởi chiếu</label>
          <input type="date" className="form-control mb-2" name="release_date" value={phimMoi.release_date} onChange={xuLyThayDoi} />
        </div>
        <div className="col-md-6">
          <label className="form-label">Phụ đề</label>
          <input className="form-control mb-2" name="subtitle" value={phimMoi.subtitle} onChange={xuLyThayDoi} />
        </div>
        <div className="col-md-6">
          <label className="form-label">Độ tuổi (VD: 16+)</label>
          <input className="form-control mb-2" name="age" value={phimMoi.age} onChange={xuLyThayDoi} />
        </div>
        <div className="col-12">
          <label className="form-label">Mô tả</label>
          <textarea className="form-control mb-2" name="description" value={phimMoi.description} onChange={xuLyThayDoi} rows={2} />
        </div>
        <div className="col-12">
          <label className="form-label">Nội dung phim</label>
          <textarea className="form-control mb-2" name="content" value={phimMoi.content} onChange={xuLyThayDoi} rows={3} />
        </div>
        <div className="col-md-6">
          <label className="form-label">Ảnh Poster</label>
          <input type="file" className="form-control mb-2" name="image" accept="image/*" onChange={xuLyThayDoi} />
        </div>
        <div className="col-md-6">
          <label className="form-label">Video Trailer</label>
          <input type="file" className="form-control mb-2" name="video" accept="video/*" onChange={xuLyThayDoi} />
        </div>
      </div>

      <button className="btn btn-success mt-3" onClick={guiLenMayChu}>
        ➕ Thêm phim
      </button>
    </div>
  );
};

export default AdminPage;
