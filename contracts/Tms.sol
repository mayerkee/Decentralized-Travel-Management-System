// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

contract Tms {
    uint256 private hotelCount;
    uint256 private roomCount;
    uint256 private categoryCount;
    uint256 private userCount;
    uint256 private coperationCount;

    constructor() {
        hotelCount = 0;
        roomCount = 0;
        categoryCount = 0;
        userCount = 0;
        coperationCount = 0;
    }

    struct Hotel {
        string name;
        bytes image;
        string country;
        string city;
        string policy;
        address owner;
    }

    struct RoomCategory {
        string name;
    }

    /*struct Facility{
      string name;
  }*/

    struct Room {
        string room_name;
        string image;
        RoomCategory category;
        Hotel hotel;
        //Facility[] fac;
        bool isVacant;
        uint256 price;
    }

    struct Booking {
        uint256 dateFrom;
        uint256 dateTo;
        Room room;
        Hotel hotel;
        User user;
        bool isCheckedIn;
    }

    struct Coperation {
        string name;
        string policy;
        address companyWalletAddress;
        Hotel hotel;
    }

    enum TypeOfUser {
        EMPLOYEE,
        NORMALUSER
    }

    struct User {
        string name;
        TypeOfUser typeofuser;
        address walletAddress;
        Coperation coperation;
    }

    event HotelAdded(
        string indexed name,
        bytes indexed image,
        string indexed country,
        string indexed city,
        string indexed policy,
        address indexed owner
    );
    event CategoryAdded(string indexed name);
    event RoomAdded(
        string indexed _roomName,
        string indexed _image,
        uint256 indexed _price,
        uint256 indexed catId,
        uint256 indexed hotelId
    );

    mapping(uint256 => Hotel) public idToHotel;
    mapping(uint256 => RoomCategory) public idToCategory;
    mapping(uint256 => Room) public idToRoom;
    mapping(uint256 => User) public idToUser;
    mapping(uint256 => Coperation) public idToCoperation;

    //mapping (uint256 => Facility) public idToFacility;

    function addHotel(
        string memory _name,
        string memory _image,
        string memory _country,
        string memory _city,
        string memory _policy
    ) public {
        //bytes(string)
        idToHotel[hotelCount] = Hotel(
            _name,
            bytes(_image),
            _country,
            _city,
            _policy,
            msg.sender
        );
        hotelCount = hotelCount + 1;
        emit HotelAdded(
            _name,
            bytes(_image),
            _country,
            _city,
            _policy,
            msg.sender
        );
    }

    function addCategory(string memory _name) public {
        RoomCategory memory roomCat = RoomCategory(_name);
        idToCategory[categoryCount] = roomCat;
        categoryCount += categoryCount;
        emit CategoryAdded(_name);
    }

    function addRoomToHotel(
        string memory _roomName,
        string memory _image,
        uint256 _price,
        uint256 catId,
        uint256 hotelId
    ) public {
        RoomCategory memory cat = idToCategory[catId];
        Hotel memory hot = idToHotel[hotelId];
        Room memory room = Room(_roomName, _image, cat, hot, false, _price);
        idToRoom[roomCount] = room;
        roomCount += roomCount;
        emit RoomAdded(_roomName, _image, _price, catId, hotelId);
    }

    function addCoperationToHotel(
        string memory _name,
        string memory _policy,
        uint256 _hotId
    ) public {
        Hotel memory hot = idToHotel[_hotId];
        Coperation memory cop = Coperation(_name, _policy, msg.sender, hot);
        idToCoperation[coperationCount] = cop;
    }

    function addUserToHotel(
        string memory _name,
        TypeOfUser _userType,
        address _userAddress,
        uint256 copId
    ) public {}

    //function bookRoom()

    /*function getHotel() public view returns (Hotel memory){
      for(uint256 i = 0; i<= hotelCount; i++){
          Hotel memory hot = idToHotel[i];
          hot = Hotel(hot.name, hot.image, hot.location, hot.noOfRooms, hot.policy, hot.owner);
          return hot;
      }
  }*/

    function getHotelCount() public view returns (uint256) {
        return hotelCount;
    }

    function getCategoryCount() public view returns (uint256) {
        return categoryCount;
    }

    function getRoomCount() public view returns (uint256) {
        return roomCount;
    }
}
