import { useEffect, useState } from "react";
import { store } from "../../store";
import { Review } from "../../types";
import { Layout } from "../../components/Layout";

export const Settings = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    (async () => {
      const reviews = await store.reviews.list();
      setReviews(reviews);
    })();
  });

  return (
    <Layout>
      <h1>Settings</h1>

      {reviews.map((review) => (
        <div key={review.slug}>
          <h2>{review.slug}</h2>
          <p>
            {review.dueDate.toISOString()} {review.level}
          </p>
        </div>
      ))}
    </Layout>
  );
};
