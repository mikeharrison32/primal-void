import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Dashboard.module.css";

const Dashboard = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [newAnnouncement, setNewAnnouncement] = useState("");
  const [channelId, setChannelId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch existing announcements from the bot's API when the page loads
    // fetch("/api/announcements", { method: "GET" })
    //   .then((res) => res.json())
    //   .then((data) => setAnnouncements(data))
    //   .catch((err) => console.error("Failed to fetch announcements:", err));
    console.log("moew");
  }, []);

  const handleNewAnnouncement = async () => {
    if (!newAnnouncement.trim() || !channelId.trim()) {
      alert("Please provide both a channel ID and a message.");
      return;
    }
    setLoading(true);

    try {
      const response = await fetch("/api/announcements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: newAnnouncement, channelId }),
      });

      if (response.ok) {
        const updatedAnnouncements = await response.json();
        setAnnouncements(updatedAnnouncements);
        setNewAnnouncement("");
        setChannelId("");
      } else {
        const errorMessage = await response.text();
        console.error("Failed to create announcement:", errorMessage);
      }
    } catch (error) {
      console.error("Error while creating announcement:", error);
    } finally {
      setLoading(false);
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
            <textarea
              value={newAnnouncement}
              onChange={(e) => setNewAnnouncement(e.target.value)}
              placeholder="Write a new announcement..."
              className={styles.textareaField}
            />
            <button
              onClick={handleNewAnnouncement}
              disabled={loading}
              className={styles.submitButton}
            >
              {loading ? "Posting..." : "Post Announcement"}
            </button>
          </div>
          <ul className={styles.announcementList}>
            {announcements.map((announcement, index) => (
              <li key={index} className={styles.announcementItem}>
                {announcement.message}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
