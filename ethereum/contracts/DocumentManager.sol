pragma solidity ^0.4.22;

contract DocumentManager {

    address public admin;

    mapping (uint => Document) documents;
    uint public numDocuments;

    enum Status {PENDDING, CLOSE, ACEPTED, REJECTED} // 0,1,2,3

    struct Document{
        address owner;
        string name;
        string contentHash;
        string linkIpfsCrypt;
        uint category;
        Status status;
    }

    constructor() public {
        admin = msg.sender;
    }

    // event
    event LogCreatedDoc(
        uint indexed numDoc,
        address owner,
        string name,
        string contentHash,
        string linkIpfsCrypt,
        uint category
    );
    event GrantDocument(
        uint indexed numDoc,
        Status status
    );
    event UpdateDocument(
        uint indexed numDoc,
        address owner,
        string name,
        string contentHash,
        string linkIpfsCrypt,
        uint category
    );
    event DeleteDocument(
        uint indexed numDoc
    );

    function newDocument(
        string _name,
        string _contentHash,
        string _linkIpfsCrypt,
        uint _category
    )
        public
    {
        numDocuments++;
        documents[numDocuments].owner = msg.sender;
        documents[numDocuments].name = _name;
        documents[numDocuments].contentHash = _contentHash;
        documents[numDocuments].linkIpfsCrypt = _linkIpfsCrypt;
        documents[numDocuments].category = _category;
        documents[numDocuments].status = Status.PENDDING;

        // emit
        emit LogCreatedDoc(
            numDocuments,
            msg.sender,
            _name,
            _contentHash,
            _linkIpfsCrypt,
            _category
        );
    }

    function grantDocument(
        uint documentId,
        Status status
    )
        public
    {
        if (msg.sender == admin) {
            documents[documentId].status = status;
            emit GrantDocument(documentId, status);
        }
    }

    function privateDocument(
        uint documentId
    )
        public
    {
        if (msg.sender == documents[documentId].owner) {
            documents[documentId].status = Status.CLOSE;
        }
    }

    function publicDocument(
        uint documentId
    )
        public
    {
        if (msg.sender == documents[documentId].owner) {
            documents[documentId].status = Status.PENDDING;
        }
    }

    function deleteDocument(
        uint documentId
    )
        public
    {
        if (msg.sender == documents[documentId].owner) {
            documents[numDocuments].name = "";
            documents[numDocuments].contentHash = "";
            documents[numDocuments].linkIpfsCrypt = "";
            documents[numDocuments].category = 0;
            documents[numDocuments].status = Status.CLOSE;
            // emit
            emit DeleteDocument(numDocuments);
        }
    }

    function updateDocument(
        uint documentId,
        string _name,
        string _contentHash,
        string _linkIpfsCrypt,
        uint _category
    )
        public
    {
        if (msg.sender == documents[documentId].owner) {
            documents[documentId].name = _name;
            documents[documentId].contentHash = _contentHash;
            documents[documentId].linkIpfsCrypt = _linkIpfsCrypt;
            documents[documentId].category = 3;
            documents[documentId].status = Status.PENDDING;

            //emit
            emit UpdateDocument(
                numDocuments,
                msg.sender,
                _name,
                _contentHash,
                _linkIpfsCrypt,
                _category
            );
        }
    }

    function getDocumentByIndex(
        uint documentId
    )
        public
        view
        returns (
            address owner,
            string name,
            string contentHash,
            string linkIpfsCrypt,
            uint category,
            Status status
        )
    {
        return (
            documents[documentId].owner,
            documents[documentId].name,
            documents[documentId].contentHash,
            documents[documentId].linkIpfsCrypt,
            documents[numDocuments].category,
            documents[numDocuments].status
        );
    }

    function getLatestDocument(
    )
        public
        view
        returns (
            uint documentId,
            address owner,
            string name,
            string contentHash,
            string linkIpfsCrypt,
            uint category,
            Status status
        )
    {
        return (
            numDocuments,
            documents[numDocuments].owner,
            documents[numDocuments].name,
            documents[numDocuments].contentHash,
            documents[numDocuments].linkIpfsCrypt,
            documents[numDocuments].category,
            documents[numDocuments].status
        );
    }
}