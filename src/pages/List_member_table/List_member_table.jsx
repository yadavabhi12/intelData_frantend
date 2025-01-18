import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Button } from "react-bootstrap";
import { ListContext } from "../../Components/ContextAPI/ListContext";
import Pagination from "../All-User-data/Pagination";
import { useNavigate } from "react-router-dom";
import "./List_member_table.css";

const List_member_table = () => {
  const { currentListId,url } = useContext(ListContext);
  const [members, setMembers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalData, setTotalData] = useState(0);
  const [columns, setColumns] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMembers();
  }, [currentPage, itemsPerPage]);

  const fetchMembers = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${url}lists/${currentListId}/members`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            page: currentPage,
            limit: itemsPerPage,
          },
        }
      );
      const fetchedMembers = response.data.members;
      setMembers(fetchedMembers);
      setTotalData(response.data.totalCount);

      // Dynamically generate columns with priority order
      if (fetchedMembers.length > 0) {
        const priorityOrder = ["name", "email", "phone"];
        const dynamicColumns = [];

        // Add priority columns first
        priorityOrder.forEach((key) => {
          if (key in fetchedMembers[0]) {
            dynamicColumns.push({
              name: key.charAt(0).toUpperCase() + key.slice(1),
              selector: (row) => row[key] || null,
              sortable: true,
            });
          }
        });

        // Add remaining columns
        Object.keys(fetchedMembers[0])
          .filter((key) => !priorityOrder.includes(key))
          .forEach((key) => {
            dynamicColumns.push({
              name: key.charAt(0).toUpperCase() + key.slice(1),
              selector: (row) => row[key] || null,
              sortable: true,
            });
          });

        setColumns(dynamicColumns);
      }
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to the first page
  };

  return (
    <div className="container">
      <h2 className="member-title-list">Members of List</h2>
      <Button className="members-btn"  onClick={() => navigate(-1)}>
        Go Back
      </Button>

      {/* Use DataTable for rendering the table */}
      <DataTable
        className="table-hover"
        columns={columns}
        data={members}
        customStyles={{
          headRow: {
            style: {
              backgroundColor: "#000",
              color: "#f4f1f1",
              fontWeight: "bold",
            },
          },
          rows: {
            style: {
              cursor: "pointer",
            },
            hoverStyle: {
              backgroundColor: "#f1f1f1",
            },
          },
        }}
      />

      {/* Custom Pagination Component */}
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(totalData / itemsPerPage)}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
        totalData={totalData}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
    </div>
  );
};

export default List_member_table;
