import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header/Header';
import Login from './LoginPage/LoginPageContainer'
import Join from './JoinPage/JoinPageContainer';
import Main from './MainPage/MainPageContainer';
import WineDetail from './WineDetailPage/WineDetailPageContainer';
import WriteReview from './Review/Write/WriteReviewContainer';
import ReviewDetail from './Review/Detail/ReviewDetailContainer';
import Search from './SearchPage/SearchPageContainer';
import Lifestyle from './LifeStyle/LifeStylePageContainer';
import LifestyleRecom from './LifeStyle/LifeStyleRecomContainer';
import Profile from './Profile/ProfilePageContainer';
import ModifyReview from './Review/Modify/ModifyReviewContainer';
import About from './About/About';
import Footer from './Footer/Footer';

const RouterComponent = () => {
    return(
        <>
            <Router>
                <Header/>
                <Routes>
                    <Route path ="/" element = {<Login/>}/>
                    <Route path ="/about" element = {<About/>}/>
                    <Route path ="/join" element = {<Join/>}/>
                    <Route path = "/main" element = {<Main/>}/>
                    <Route path = "/search/:searchwine" element = {<Search/>}/>
                    <Route path = "/lifestyle" element = {<Lifestyle/>}/>
                    <Route path = "/lifestyle/recom/:winecode" element = {<LifestyleRecom/>}/>
                    <Route path="/wines/:wineId" element={<WineDetail/>}/>
                    <Route path="/review" element={<WriteReview/>}/>
                    <Route path="/review/:reviewId" element={<ModifyReview/>}/>
                    <Route path="/wines/:wineId/reviews/user/:userId" element={<ReviewDetail/>}/>
                    <Route path="/profile/:userId" element={<Profile/>}/>
                </Routes>
                <Footer/>
            </Router>
        </>
    );
};
export default RouterComponent;
