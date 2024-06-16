import React, { useEffect, useState } from "react"
import Post from "./Post"
import './Posts.css'
import { useBlockchain } from "../../utils/BlockchainContext";

const Posts = () =>{
    const [posts, setPosts] = useState([]);
    const { contract } = useBlockchain();

    /* const posts = [
        {
            image: "https://a57.foxnews.com/static.foxnews.com/foxnews.com/content/uploads/2024/06/720/405/Melissa-Cohen-Biden-Garrett-Ziegler.jpg?ve=1&tl=1",
            heading: "Blog Heading",
            author: "richa_21",
            description: "Melissa Cohen Biden the wife of Hunter Biden lashed out at a former Trump White House aide during a Tuesday appearance in court to support her husband, who has been charged with three felonies stemming from a 2018 firearm purchase. This is additional text to exceed the 40 word limit for demonstration purposes."
        },
        {
            image: "https://a57.foxnews.com/static.foxnews.com/foxnews.com/content/uploads/2024/06/720/405/AP24159853585088.jpg?ve=1&tl=1",
            heading: "Apollo 8 astronaut, William Anders, who took famous picture of Earth, killed in small plane crash",
            author: " Stepheny Price",
            description: "The victim in a fatal plane crash Friday in Washington state has been identified as Retired Maj. Gen. William Anders, the former Apollo 8 astronaut who took the iconic 'Earthrise' photo, his son Greg Anders confirmed to The Associated Press."
        },
        {
            image: "https://static01.nyt.com/images/2024/06/07/multimedia/07PAT-SAJAK-STYLE1-wvjt/07PAT-SAJAK-STYLE1-wvjt-jumbo.jpg?quality=75&auto=webp",
            heading: "Pat Sajak, the Cool, Unflappable, Reliable Host, Signs Off",
            author: " Guy Trebay",
            description: "In 41 seasons at the helm of “Wheel of Fortune,” Mr. Sajak, whose final episode as host airs on Friday, has been a durable fixture of the American cultural landscape."
        },
        {
            image: "https://static01.nyt.com/images/2024/06/07/multimedia/07dc-hunter-naomi-wpmk/07dc-hunter-naomi-wpmk-jumbo.jpg?quality=75&auto=webp",
            heading: "Hunter Biden’s Daughter Naomi Testifies on His Behalf in Gun Trial",
            author: "Eileen Sullivan",
            description: "Under cross-examination, government lawyers elicited anguished, and excruciating, details about their relationship at the time. Naomi Biden, left, hoped to bolster her father’s contention that he was working hard to kick his addiction to crack cocaine and alcohol in 2018."
        },
        {
            image: "https://ichef.bbci.co.uk/news/1024/cpsprodpb/0e38/live/487edc80-2511-11ef-bfa2-99162a2eefd9.png.webp",
            heading: "Danish PM attacked by man in Copenhagen",
            author: "George Wright",
            description: "Denmark PM Mette Frederiksen is said to have been left 'shocked' after being struck by a man while walking in the centre of Copenhagen. The assault took place in a square in the city's old town when a man walked up to the politician and hit her."
        },
    ]; */
    
   /*  useEffect(() => {
        const initWeb3 = async () => {
            try {
                const web3Instance = await getWeb3();
                const accounts = await web3Instance.eth.getAccounts();
                const networkId = await web3Instance.eth.net.getId();
                const deployedNetwork = BlogContract.networks[networkId];
                const contractInstance = new web3Instance.eth.Contract(
                    BlogContract.abi,
                    deployedNetwork && deployedNetwork.address,
                );

                setWeb3(web3Instance);
                setContract(contractInstance);
                setAccount(accounts[0]);
            } catch (error) {
                console.error("Error initializing web3", error);
            }
        };
        initWeb3();
    }, []); */

    useEffect(() => {
        const fetchPosts = async () => {
            if (contract) {
                try {
                    const postCount = await contract.methods.postCount().call();
                    const fetchedPosts = [];

                    for (let i = 0; i < postCount; i++) {
                        const post = await contract.methods.getPost(i).call();
                        fetchedPosts.push({
                            image: post[3],
                            heading: post[0],
                            author: post[5],
                            description: post[1],
                            hashtags: post[2],
                        });
                    }
                    console.log("POSSSSSSSSSSSSSTTTTTTTTTTTTSSSSSSSSSSS:",fetchedPosts)
                    setPosts(fetchedPosts);
                } catch (error) {
                    console.error("Error fetching posts", error);
                }
            }
        };
        fetchPosts();
    }, [contract]);

    return (
        <>
        <div className="carousel-container">
            <div className="carousel-content">
                {posts.map((post, index)=>(
                        <Post 
                            image={post.image}
                            heading={post.heading}
                            author={post.author}
                            description={post.description}
                            hashtags={post.hashtags}
                        />
                ))}
            </div>
        </div>
        </>
    )
}

export default Posts