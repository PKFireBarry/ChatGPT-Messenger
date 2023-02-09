interface Message {
  id: string;
  text: string;
  createdAt: admin.firestore.Timestamp;
}