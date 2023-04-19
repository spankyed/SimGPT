import { useNavigate, Form as RouterForm, redirect, ActionFunctionArgs, LoaderFunctionArgs, useLoaderData, Link } from "react-router-dom";
import { Button } from "antd";
import { useEffect, useRef, useState } from "react";
import { User } from "../api";
import './new-player.css'

export default () => {
  const user = useLoaderData() as User;
  const [showModal, setShowModal] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    if (!user) {
      setShowModal(true)
    }
  }, []);

  const hideModal = () => {
    setShowModal(false);
  }

  return (
    <>
    {showModal &&
      <div className="modal-overlay">
        <div id="new-player-modal" className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>New Player</h2>
            </div>

            <RouterForm 
              // ref={formRef}
              onSubmit={hideModal}
              method="post"
            >
              <div className="modal-body">
                <input placeholder="Player 1" name="playerName" />
              </div>
              <div className="modal-footer">
                <Button 
                  type="primary" 
                  htmlType="submit"
                  className="flex self-center justify-center"
                  size='large'
                >
                  {/* <SaveOutlined /> */}
                  {/* <Text style={{ fontSize: 12 }}>Add a New Module</Text> */}
                  Create
                </Button>
              </div>
            </RouterForm>
          </div>
        </div>
      </div>
    }
    </>
  );
}
