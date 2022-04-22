from cmath import log
from django.db import connection
from django.http import HttpResponse
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from datetime import datetime
import logging

def search_review():
    cursor = connection.cursor()
    reviewSql = "select user_id, wine_id, score from review"
    wishlistSql = "select user_id, wine_id from wine_wishlist"
    # 리뷰
    result = cursor.execute(reviewSql)
    reviews = cursor.fetchall()
    connection.commit()
    # 위시리스트
    result = cursor.execute(wishlistSql)
    wishs = cursor.fetchall()
    connection.commit()
    
    connection.close()
    
    # 딕셔너리로 저장
    review_dic=[]
    for review in reviews:
        row = {'user_id': review[0], 'wine_id': review[1], 'score': review[2]}
        review_dic.append(row)
    wish_dic=[]
    for wish in wishs:
        row = {'user_id': wish[0], 'wine_id': wish[1], 'score': 4}  # 위시리스트 와인에 4점 부여
        wish_dic.append(row)

    review_df, wish_df = pd.DataFrame(review_dic), pd.DataFrame(wish_dic)
    df = pd.concat([wish_df, review_df], ignore_index=True)
    # 반영기준 1. 위시리스트, 평점 둘 다 있으면 평점을 반영 2. 평점이 여러 개면 최근 평점을 반영
    df = df.drop_duplicates(subset=['user_id', 'wine_id'], keep='last')
    # print(df)

    return df


def search_user():
    cursor = connection.cursor()
    sql = "select user_id from user"
    result = cursor.execute(sql)
    dataset = cursor.fetchall()
    connection.commit()
    connection.close()
    
    users = [x[0] for x in dataset]
    return users


def search_wine():
    cursor = connection.cursor()
    sql = "select wine_id from wine"
    result = cursor.execute(sql)
    dataset = cursor.fetchall()
    connection.commit()
    connection.close()
    
    wines = [x[0] for x in dataset]
    return wines


def userCF_save(request, user):
    fifteenfive_ratings = search_review()
    vivino_ratings = pd.read_csv('home/data/dump_ratings.csv', encoding='utf-8')
    ratings = pd.concat([fifteenfive_ratings, vivino_ratings], ignore_index=True)

    user_matrix = ratings.pivot_table('score', index='user_id', columns='wine_id')
    user_matrix.fillna(0, inplace=True)
    
    user_cosine_sim = cosine_similarity(user_matrix)
    user_cosine_sim = pd.DataFrame(user_cosine_sim, index=user_matrix.index, columns=user_matrix.index)


    user_recomm_dic = {}

    if user == 'fetch_all':  # crontab 주기적 실행 - 모든 유저에 대해 갱신
        users = search_user()  # 유저목록 가져오기
        print(f'users: {users}')
        
        for user_id in users:
            user_id = int(user_id)

            try:
                # user_id에게 추천할 와인 10개 고르기
                sim_users = user_cosine_sim.sort_values(by=user_id, ascending=False).index[1:21]  # 자기자신 제외해야해서 1부터
                user_matrix_T = user_matrix.T
                best = []
                for sim_user in sim_users:
                    # 가장 유사한 20명의 사용자들이 높게 평가한 wine list(상위 10개)를 가져온다.
                    # user가 아직 평가하지 않은(==평점이 0인) 와인만 담는다.
                    sorted_result = user_matrix_T.loc[:, sim_user][(user_matrix_T.loc[:, user_id] == 0)].sort_values(ascending=False)
                    sorted_result = sorted_result[sorted_result.values > 0]  # 정렬된 목록에서 sim_user가 평가하지 않은(평점이 0) 것은 거른다.
                    best.append(sorted_result.index[:10].tolist())

                most_common = {}
                for i in range(len(best)):
                    for j in best[i]:
                        if j in most_common:
                            most_common[j] += 1
                        else:
                            most_common[j] = 1
                            
                sorted_list = sorted(most_common.items(), key=lambda item: item[1], reverse=True)
                recomm_list = [x[0] for x in sorted_list][:10]  # 10개 담기
                user_recomm_dic[user_id] = recomm_list
            except Exception as e:
                print('에러 발생: ', e)

    else:  # 유저 회원가입 시 
        user_id = int(user)

        # user_id에게 추천할 와인 10개 고르기
        sim_users = user_cosine_sim.sort_values(by=user_id, ascending=False).index[1:21]  # 자기자신 제외해야해서 1부터
        print(f'sim_users: {sim_users}')
        user_matrix_T = user_matrix.T
        best = []
        for sim_user in sim_users:
            # 가장 유사한 20명의 사용자들이 높게 평가한 wine list(상위 10개)를 가져온다.
            # user가 아직 평가하지 않은(==평점이 0인) 와인만 담는다.
            sorted_result = user_matrix_T.loc[:, sim_user][(user_matrix_T.loc[:, user_id] == 0)].sort_values(ascending=False)
            sorted_result = sorted_result[sorted_result.values > 0]  # 정렬된 목록에서 sim_user가 평가하지 않은(평점이 0) 것은 거른다.
            best.append(sorted_result.index[:10].tolist())

        most_common = {}
        for i in range(len(best)):
            for j in best[i]:
                if j in most_common:
                    most_common[j] += 1
                else:
                    most_common[j] = 1
                    
        sorted_list = sorted(most_common.items(), key=lambda item: item[1], reverse=True)
        recomm_list = [x[0] for x in sorted_list][:10]  # 10개 담기
        user_recomm_dic[user_id] = recomm_list
        


    print('<user_recomm_dic>')
    print(user_recomm_dic)

    cursor = connection.cursor()

    # fetch_all이면 truncate 실행
    if user == 'fetch_all':
        truncate_sql = "truncate table userBasedCF"
        cursor.execute(truncate_sql)
        cursor.fetchall()
        connection.commit()
        print(truncate_sql)
    
    # DB에 insert
    for user_id, wine_list in user_recomm_dic.items():

        for wine in wine_list:
            inSql = "insert into userBasedCF(user_id, wine_id) values (%s, %s)"
            cursor.execute(inSql, (str(user_id), str(wine)))
            cursor.fetchall()
            connection.commit()
    
    connection.close()
    print('DB 저장 완료')

    return HttpResponse("정상적으로 값이 저장되었습니다")


def itemCF_save(request):
    fifteenfive_ratings = search_review()
    vivino_ratings = pd.read_csv('home/data/dump_ratings.csv', encoding='utf-8')
    ratings = pd.concat([fifteenfive_ratings, vivino_ratings], ignore_index=True)

    item_matrix = ratings.pivot_table('score', index='wine_id', columns='user_id')
    item_matrix.fillna(0, inplace=True)
    
    item_cosine_sim = cosine_similarity(item_matrix)
    item_cosine_sim = pd.DataFrame(item_cosine_sim, index=item_matrix.index, columns=item_matrix.index)


    item_recomm_dic = {}

    # crontab 주기적 실행 - 모든 와인에 대해 갱신
    wines = search_wine()  # 와인목록 가져오기
    
    for wine_id in wines:

        # wine_id와 유사한 와인 10개 고르기
        sim_wines = item_cosine_sim.sort_values(by=wine_id, ascending=False)[wine_id]
        sim_wines = sim_wines[sim_wines.values >= 0.2].index[1:11]  # 유사도 0.2 이상인 와인만  # 자기자신 제외해야해서 1부터
        
        if len(sim_wines) < 5:  # 유사 와인이 5개 미만이면 추천리스트 저장 X
            continue
        
        item_recomm_dic[wine_id] = sim_wines

        
    print('<item_recomm_dic>')
    print(item_recomm_dic.keys())
    print(f'길이: {len(item_recomm_dic)}')

    cursor = connection.cursor()

    # truncate 실행
    truncate_sql = "truncate table itemBasedCF"
    cursor.execute(truncate_sql)
    cursor.fetchall()
    connection.commit()
    print(truncate_sql)
    
    # DB에 insert
    for based_wine_id, recomm_wines in item_recomm_dic.items():
        for recomm_wine_id in recomm_wines:
            inSql = "insert into itemBasedCF(based_wine_id, recomm_wine_id) values (%s, %s)"
            cursor.execute(inSql, (str(based_wine_id), str(recomm_wine_id)))
            cursor.fetchall()
            connection.commit()
    
    connection.close()
    print('DB 저장 완료')

    return HttpResponse("정상적으로 값이 저장되었습니다")


def fetch_every_midnight():
    print('====================================================================================================')
    print('userCF_save 실행 시작')
    userCF_save('', 'fetch_all')
    print('itemCF_save 실행 시작')
    itemCF_save('')
    print(datetime.now())
    print('====================================================================================================')


def check_cron():
    logging.info(" process begins!")
    print('====================================================================================================')
    print('check_cron 실행됨!!')
    print(datetime.now())
    print('====================================================================================================')


if __name__ == "__main__":
    fetch_every_midnight()