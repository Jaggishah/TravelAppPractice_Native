import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'
import Color from '@/constants/Color'
import destinationCategories from '@/data/categories'
import { MaterialCommunityIcons } from '@expo/vector-icons'

type Props =  {
    onCategoryChanged : (category : string) => void;
}
export default function CategoryButton({onCategoryChanged} : Props) {
    const scrollRef = useRef<ScrollView>(null);
    const itemRef= useRef<TouchableOpacity[] | null[]>([]);
    const [activeIndex, setActiveIndex ] = useState(0);

    const handleSelectCategory = ( index : number ) =>{
        const selected = itemRef.current[index];
        setActiveIndex(index);
        onCategoryChanged(destinationCategories[index].title);
        // selected?.measure((x) =>{
        //     scrollRef.current?.scrollTo({x:x,y:0,animated:true})
        // })
    }

  return (
    <View>
      <Text style={styles.title}>Categories</Text>
      <ScrollView horizontal contentContainerStyle={{
        gap:20,
        paddingVertical: 10,
        marginBottom:10
      }}
      ref={scrollRef}
      showsHorizontalScrollIndicator={false}>
        { destinationCategories.map((item,index) =>(
            <TouchableOpacity onPress={() => handleSelectCategory(index)} 
            style={ activeIndex == index ? styles.categoryBtnActive : styles.categoryBtn} 
            key={index} 
            ref={(el) => itemRef.current[index] = el} >
                <MaterialCommunityIcons name={item.iconName  as any} size={20} color={ activeIndex == index ? Color.white :Color.black}/>
                    <Text style={ activeIndex == index ? styles.categoryBtnTextActive : styles.categoryBtnText }>
                        {item.title}
                    </Text>
            </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    title:{
        fontSize: 22,
        fontWeight: '700',
        color : Color.black
    },
    categoryBtn:{
        flexDirection:'row',
        alignItems:'center',
        backgroundColor: Color.white,
        paddingHorizontal:16,
        paddingVertical:10,
        borderRadius:10,
        shadowColor: "#333333",
        shadowOffset: { width : 2, height : 4},
        shadowOpacity: 0.1,
        shadowRadius : 3

    },
    categoryBtnText:{
        marginLeft:5,
        color:Color.black,
    },
    categoryBtnActive:{
        flexDirection:'row',
        alignItems:'center',
        backgroundColor: Color.primaryColor,
        paddingHorizontal:16,
        paddingVertical:10,
        borderRadius:10,
        shadowColor: "#333333",
        shadowOffset: { width : 2, height : 4},
        shadowOpacity: 0.1,
        shadowRadius : 3
    },
    categoryBtnTextActive:{
        marginLeft:5,
        color:Color.white
    }
})