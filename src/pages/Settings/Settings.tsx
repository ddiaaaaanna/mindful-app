import Page from "../../components/Page/Page";
import("./Settings.css");

function Settings() {
  return (
    <div className="settings-page">
      <Page title="Settings">
        <div className="settings-options">
          <ul className="settings-list">
            <li>
              <a href="">change theme</a>
            </li>
            <li>
              <a href="">restore default prompts</a>
            </li>
            <li>
              <a href="">delete history</a>
            </li>
            <li>
              <a href="">change name</a>
            </li>
          </ul>
        </div>
      </Page>
    </div>
  );
}

export default Settings;
