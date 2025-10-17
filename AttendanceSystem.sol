// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AttendanceSystem {
    struct Student {
        string name;
        string rollNumber;
        address walletAddress;
        bool isRegistered;
    }
    
    struct AttendanceRecord {
        string rollNumber;
        string date;
        string subject;
        bool isPresent;
        uint256 timestamp;
    }
    
    address public admin;
    mapping(string => Student) public students;
    AttendanceRecord[] public attendanceRecords;
    
    event StudentRegistered(string name, string rollNumber, address walletAddress);
    event AttendanceMarked(string rollNumber, string date, string subject, bool isPresent);
    
    constructor() {
        admin = msg.sender;
    }
    
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }
    
    function registerStudent(
        string memory _name, 
        string memory _rollNumber,
        address _walletAddress
    ) public onlyAdmin {
        require(!students[_rollNumber].isRegistered, "Student already registered");
        students[_rollNumber] = Student(_name, _rollNumber, _walletAddress, true);
        emit StudentRegistered(_name, _rollNumber, _walletAddress);
    }
    
    function markAttendance(
        string memory _rollNumber,
        string memory _date,
        string memory _subject,
        bool _isPresent
    ) public onlyAdmin {
        require(students[_rollNumber].isRegistered, "Student not registered");
        
        AttendanceRecord memory newRecord = AttendanceRecord(
            _rollNumber,
            _date,
            _subject,
            _isPresent,
            block.timestamp
        );
        
        attendanceRecords.push(newRecord);
        emit AttendanceMarked(_rollNumber, _date, _subject, _isPresent);
    }
}