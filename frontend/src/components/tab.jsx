import styles from "./tab.module.css";

// Helper: create empty tab string line
// const createEmptyLine = () => "----------------";

// Helper: number of characters between notes
const spacing = 4;

export function Tab({ tabJson = [] }) {
  const generateTabs = (tabJson) => {
    const lines = {
      G: [],
      D: [],
      A: [],
      E: [],
    };

    // let position = 0;

    for (const note of tabJson) {
      const fret = String(note.fret);
      const pad = "-".repeat(spacing - fret.length); // adjust spacing based on fret length

      for (const string of ["G", "D", "A", "E"]) {
        if (string === note.string) {
          lines[string].push(fret + pad);
        } else {
          lines[string].push("-".repeat(spacing));
        }
      }

      // position++;
    }

    // Build tab strings
    const tabLines = Object.entries(lines).map(([string, segments]) => {
      return `${string}|${segments.join("")}`;
    });

    return tabLines.join("\n");
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Tablature</h3>
      <div className={styles.tabContainer}>
        <pre className={styles.tabContent}>
          {tabJson.length > 0 ? generateTabs(tabJson) : "No tabs to show."}
        </pre>
      </div>
    </div>
  );
}
