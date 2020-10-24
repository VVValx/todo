export async function fetchData(db, collection, state) {
  const ref = await db.collection(collection).get();
  const data = ref.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });

  state(data);
}
