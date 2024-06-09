import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
const PostTabs = () => {
  return (
    <div>
      <Tabs>
        <TabList>
          <Tab>All</Tab>
          <Tab>Tech</Tab>
          <Tab>LifeStyle</Tab>
          <Tab>Sports</Tab>
          <Tab>Politics</Tab>
          <Tab>Miscellaneous</Tab>
        </TabList>

        <TabPanel>
          <h2>Any content 1</h2>
        </TabPanel>
        <TabPanel>
          <h2>Any content 2</h2>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default PostTabs;
