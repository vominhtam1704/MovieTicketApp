import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Button, Form, Alert } from 'react-bootstrap';

const PaymentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = React.useState('');
  const [card, setCard] = React.useState('');
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState('');

  const handlePay = (e) => {
    e.preventDefault();
    setError('');
    if (!name || !card) {
      setError('Vui lòng nhập đầy đủ thông tin.');
      return;
    }
    // Giả lập thanh toán thành công
    setTimeout(() => {
      setSuccess(true);
    }, 1000);
  };

  return (
    <Container className="py-5 d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "80vh" }}>
      <Card className="shadow p-4" style={{ maxWidth: 420, width: "100%" }}>
        <h2 className="mb-3 text-center" style={{ fontWeight: 700 }}>Thanh toán cho phim </h2>
        <p className="text-center text-secondary mb-4">Vui lòng nhập thông tin để hoàn tất thanh toán vé xem phim.</p>
        {success ? (
          <Alert variant="success" className="text-center">
            Thanh toán thành công! <br /> Chúc bạn xem phim vui vẻ
            <div className="mt-3">
              <Button variant="primary" onClick={() => navigate('/')}>Về trang chủ</Button>
            </div>
          </Alert>
        ) : (
          <Form onSubmit={handlePay}>
            <Form.Group className="mb-3">
              <Form.Label>Họ và tên</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập họ tên"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Số thẻ ngân hàng</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập số thẻ"
                value={card}
                onChange={e => setCard(e.target.value)}
                maxLength={19}
              />
            </Form.Group>
            {error && <Alert variant="danger">{error}</Alert>}
            <Button type="submit" variant="success" className="w-100 fw-bold">
              Thanh toán
            </Button>
          </Form>
        )}
      </Card>
    </Container>
  );
};

export default PaymentPage;