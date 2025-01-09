import { useState, useEffect } from "react";
import styles from "../styles/Dashboard.module.css";

const Dashboard = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [announcementData, setAnnouncementData] = useState({
    title: "",
    description: "",
  });
  const [channelId, setChannelId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNewAnnouncement = async (channelId, title, description) => {
    try {
      const response = await fetch(
        "https://primal-void-bot.onrender.com/announcements",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Ensure the request is in JSON format
          },
          body: JSON.stringify({ channelId, title, description }), // Send both title and description
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data.message); // Output success message
        setAnnouncementData({ title: "", description: "" }); // Clear title and description after posting
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData.error);
      }
    } catch (error) {
      console.error("Error while creating announcement:", error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevents adding a newline
      setLoading(true);
      handleNewAnnouncement(
        channelId,
        announcementData.title,
        announcementData.description
      ).finally(() => {
        setLoading(false);
      });
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.dashboardHeader}>
        <h1>Primal Void Dashboard</h1>
      </header>
      <main className={styles.dashboardMain}>
        <section className={styles.announcementSection}>
          <h2>Announcements</h2>
          <div className={styles.announcementInput}>
            <input
              type="text"
              value={channelId}
              onChange={(e) => setChannelId(e.target.value)}
              placeholder="Enter Discord channel ID"
              className={styles.inputField}
            />
            <input
              type="text"
              value={announcementData.title}
              onChange={(e) =>
                setAnnouncementData({
                  ...announcementData,
                  title: e.target.value,
                })
              }
              placeholder="Enter announcement title"
              className={styles.inputField}
            />
            <textarea
              value={announcementData.description}
              onChange={(e) =>
                setAnnouncementData({
                  ...announcementData,
                  description: e.target.value,
                })
              }
              placeholder="Write a description..."
              className={styles.textareaField}
              onKeyDown={handleKeyDown} // Detect Enter key press
            />
            <button
              onClick={() => {
                setLoading(true);
                handleNewAnnouncement(
                  channelId,
                  announcementData.title,
                  announcementData.description
                ).finally(() => {
                  setLoading(false);
                });
              }}
              disabled={
                loading ||
                !channelId ||
                !announcementData.title ||
                !announcementData.description
              }
              className={styles.submitButton}
            >
              {loading ? "Posting..." : "Post Announcement"}
            </button>
          </div>
          <ul className={styles.announcementList}>
            {announcements.map((announcement, index) => (
              <li key={index} className={styles.announcementItem}>
                {announcement.title}: {announcement.description}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
