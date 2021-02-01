import React, { useState, useEffect } from "react";

import StatusForm from "./StatusForm/StatusForm";
import Posts from "./Posts/Posts";

import { Card, Image } from "antd";
import Sidebar from "../../Sidebar/Sidebar";

const Newsfeed = React.memo((props) => {
  const [random, setRandom] = useState(0);
  const news = [
  {
    author: 'Opinion by Peniel E. Joseph',
    title: "Martin Luther King Jr.'s legacy demands truth before unity",
    description: "Contemplating the legacy of Dr. Martin Luther King Jr. in the wake of a White riot at the US Capitol, historian Peniel Joseph says the violence of January 6 reminds us that King's warnings about racism's dangers to American democracy continue in our own time.…",     
    url: 'https://www.cnn.com/2021/01/16/opinions/martin-luther-king-legacy-with-capitol-violence-trump-impeachment-joseph/index.html',
    urlToImage: 'https://cdn.cnn.com/cnnnext/dam/assets/210115192617-mlk-freedom-movement-rally-1966-retricted-super-tease.jpg',
    publishedAt: '2021-01-17T03:32:04Z',
  },
  {
    author: 'Nigel Barber Ph.D.',
    title: 'U.S. Body Politic Mounts Immune Defense',
    description: "At the peak of a pandemic, we are acutely aware of the body's immune response to disease. Something similar is occurring in the political response to the Capitol insurrection.",
    url: 'https://www.psychologytoday.com/ca/blog/the-human-beast/202101/us-body-politic-mounts-immune-defense',
    urlToImage: 'https://cdn.psychologytoday.com/sites/default/files/styles/og_image/public/field_blog_entry_teaser_image/2021-01/body_politic_mounts_immune_response_1_tap_theforwardassist.jpg?itok=O6PIjxz4',
    publishedAt: '2021-01-21T17:27:05Z',
  },
  {
    author: 'Nigel Barber Ph.D.',
    title: 'U.S. Body Politic Mounts Immune Defense',
    description: "At the peak of a pandemic, we are acutely aware of the body's immune response to disease. Something similar is occurring in the political response to the Capitol insurrection.",
    url: 'https://www.psychologytoday.com/us/blog/the-human-beast/202101/us-body-politic-mounts-immune-defense',
    urlToImage: 'https://cdn.psychologytoday.com/sites/default/files/styles/og_image/public/field_blog_entry_teaser_image/2021-01/body_politic_mounts_immune_response_1_tap_theforwardassist.jpg?itok=O6PIjxz4',
    publishedAt: '2021-01-21T17:27:05Z',
  },
  {
    author: 'Robin Givhan',
    title: 'Flying the flag of fascism for Trump - The Washington Post',
    description: 'Americans stormed the U.S. Capitol while flying the Confederate flag.  That is who they are. And they are part of this body politic.',
    url: 'https://www.washingtonpost.com/nation/2021/01/06/flying-flag-fascism-trump/',
    urlToImage: 'https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/QZUTHGSQMQI6XIPV7WXSRT6KSA.jpg&w=1440',
    publishedAt: '2021-01-07T03:13:00Z',
  },
  {
    author: 'Camilla Tominey',
    title: 'Why class clown Gavin Williamson has never seemed under more pressure to do his homework',
    description: 'Twitter never seems to miss a day lampooning the Education Secretary as Frank Spencer, the accident-prone star character of the iconic sitcom Some Mothers Do...',
    url: 'https://news.yahoo.com/gavin-williamson-hugely-unpopular-only-171723998.html',       
    urlToImage: 'https://s.yimg.com/ny/api/res/1.2/SFGQsb9fOqP9WVuSeGpoRg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTIwMDA7aD0xMjUw/https://s.yimg.com/uu/api/res/1.2/aJWhOxg_CZpuWiB1yypq8A--~B/aD0xNTYyO3c9MjQ5OTthcHBpZD15dGFjaHlvbg--/https://media.zenfs.com/en/the_telegraph_258/824f8f7e533b911441152e935ff6b1ab',
    publishedAt: '2021-01-26T17:17:23Z',
    
  },
  {
    author: 'The New York Times',
    title: 'Biden Keeps Focus on the Future as Trump Is Impeached Again',
    description: 'With less than a week before he will be inaugurated, president-elect Joseph R. Biden Jr. will unveil his stimulus proposals in a speech, laying out plans to expand coronavirus vaccinations and heal the economy.',
    url: 'https://www.nytimes.com/live/2021/01/14/us/impeachment-trump',
    urlToImage: 'https://static01.nyt.com/images/2021/01/11/us/politics/11dc-inauguration/11dc-inauguration-facebookJumbo.jpg',
    publishedAt: '2021-01-14T13:48:42Z',
   
  }
]
  useEffect(() => {
    const interval = setInterval(
      setRandom(Math.floor(Math.random() * (5 - 0 + 1)) + 0)
    ,5000);
    return () => {
      clearInterval(interval);
    }
  },[])
  const { Meta } = Card;
  return (
    <div>
      <Sidebar />
      <div className="grid grid-cols-10 w-5/6 mx-auto mt-24 gap-4">
        <div className="col-span-7">
          <StatusForm />
          <Posts />
        </div>

        {/* News */}
        <div className="col-span-3">
          {news.length === 0 ? null : (
            <a target="_blank" rel="noreferrer" href={news[random] ? news[random].url : ""}>
              <Card
              title="Breaking news"
                cover={
                  <Image preview={{
                    mask: "Read more",
                    visible: false
                  }} src={news[random] ? news[random].urlToImage : ""} />
                }
              >
                <Meta
                  title={news[random] ? news[random].title : ""}
                  description={news[random] ? news[random].description : ""}
                  style={{ margin: "8px 0px", fontSize: "14px" }}
                />

                <div className="flex flex-col">
                  <span className="font-bold text-lg">
                    <span className="text-sm font-thin text-gray-400">by </span>
                    {news[random] ? news[random].author : ""}
                  </span>
                  <span className="text-gray-400">
                    Published at {news[random] ? news[random].publishedAt : ""}
                  </span>
                </div>
              </Card>
            </a>
          )}
        </div>
      </div>
    </div>
  );
});

export default Newsfeed;
