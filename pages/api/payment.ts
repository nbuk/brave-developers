const payment = (req, res) => {
  if (Math.floor(Math.random() * 100) > 50) {
     return res.status(200).json({ error: false, message: 'Оплата прошла успешно' });
  }

  res.status(200).json({ error: true, message: 'При оплате произошла ошибка. Повторите попытку позже.' });
}

export default payment;