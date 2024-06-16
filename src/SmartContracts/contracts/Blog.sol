// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Blog {
    struct User {
        string name;
        string email;
        string password;
        address walletAddress;
    }

    struct BlogPost {
        uint id;
        string title;
        string content;
        string hashtags;
        string image;
        address author;
        string authorName;
    }

    mapping(address => User) public users;
    BlogPost[] public posts;
    uint public postCount = 0;

    event PostCreated(
        uint id,
        string title,
        string content,
        string hashtags,
        string image,
        address author,
        string authorName
    );

    function signup(string memory _name, string memory _email, string memory _password) public {
        require(bytes(users[msg.sender].email).length == 0, "User already exists");
        users[msg.sender] = User(_name, _email, _password, msg.sender);
    }

    function login(string memory _email, string memory _password) public view returns (bool) {
        address userAddress = msg.sender;
        return keccak256(abi.encodePacked(users[userAddress].email)) == keccak256(abi.encodePacked(_email)) &&
               keccak256(abi.encodePacked(users[userAddress].password)) == keccak256(abi.encodePacked(_password));
    }

    function createPost(
        string memory _title,
        string memory _content,
        string memory _hashtags,
        string memory _image,
        string memory _authorName
    ) public {
        posts.push(BlogPost(postCount, _title, _content, _hashtags, _image, msg.sender, _authorName));
        emit PostCreated(postCount, _title, _content, _hashtags, _image, msg.sender, _authorName);
        postCount++;
    }

    function getPost(uint _id) public view returns (
        string memory,
        string memory,
        string memory,
        string memory,
        address,
        string memory
    ) {
        BlogPost memory post = posts[_id];
        return (post.title, post.content, post.hashtags, post.image, post.author, post.authorName);
    }
}
