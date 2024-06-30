import { createContext, useContext, useState } from "react";

const MembershipContext = createContext();

export const useMembership = () => {
  return useContext(MembershipContext);
};

export const MembershipProvider = ({ children }) => {
  const [isMember, setIsMember] = useState(false);

  const value = {
    isMember,
    setIsMember,
  };

  return (
    <MembershipContext.Provider value={value}>
      {children}
    </MembershipContext.Provider>
  );
};
