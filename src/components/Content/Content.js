import Logo from "../Logo";
import GameBoard from "../GameBoard";
import BettingPanel from "../BettingPanel";
import RecentPlays from "../RecentPlays";
const Content = ({ loading, setLoading, depositText, setDepositText }) => {
  return (
    <>
      <Logo />
      <GameBoard />
      <BettingPanel
        loading={loading}
        setLoading={setLoading}
        depositText={depositText}
        setDepositText={setDepositText}
      />
      <RecentPlays />
    </>
  );
};

export default Content;
